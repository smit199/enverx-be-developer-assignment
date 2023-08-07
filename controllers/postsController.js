const multer = require('multer');
const crypto = require('crypto');
const AppError = require('../utils/appError');
const postModel = require('../models/postModel');
const { catchAsyncErrors } = require('./errorController');
const APIFeatures = require('../utils/apiFeatures');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        const ext = file.mimetype.split('/')[1]; 
        cb(null, `post-${crypto.randomBytes(8).toString('hex')}-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(new AppError('Please upload only image!', 400), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadPostImage = upload.single('cover_photo');

exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
    const features = new APIFeatures(postModel.find(), req.query);
    const posts = await features.search().filter().sort().limitFields().paginate().query;
    res.status(200).json({
        status: 'success',
        message: null,
        data: {
            posts,
        }
    });
});

exports.getPostById = catchAsyncErrors(async (req, res, next) => {
    const post = await postModel.findById(req.params.id);
    if(!post)   throw new AppError('post with given id does not exist', 404);
    res.status(200).json({
        status: 'success',
        message: null,
        data: {
            post,
        }
    });
});

exports.createPost = catchAsyncErrors(async (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    let filterBody = {...req.body};
    if(req.file) filterBody.cover_photo = req.file.filename;
    const newPost = await postModel.create(filterBody);
    res.status(201).json({
        status: 'success',
        message: 'New post is created successfully',
        data: {
            post: newPost,
        }
    });
});

exports.updatePost = catchAsyncErrors(async (req, res, next) => {
    let filterBody = {...req.body};
    if(req.file) filterBody.cover_photo = req.file.filename;
    const updatedPost = await postModel.findByIdAndUpdate(req.params.id, filterBody, { new: true, runValidators: true });
    if(!updatedPost)   throw new AppError('Post with given id does not exist', 404);
    res.status(200).json({
        status: 'success',
        message: 'Post is updated succesfully',
        data: {
            post: updatedPost,
        }
    });
});

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
    const deletedPost = await postModel.findByIdAndDelete(req.params.id);
    if(!deletedPost)   throw new AppError('Post with given id does not exist', 404);
    res.status(204).json({
        status: 'success',
        message: 'Post is deleted successfully',
        data: null
    });
});