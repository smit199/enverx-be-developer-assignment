# Blogn RESTful API - Nodejs and MongoDB

This is a RESTful API for simple blog application to manage blog posts using Nodejs, Expressjs and MongoDB. API allows to create, read, update and delete blog posts. API also provide additional features of filtering, sorting, searching with text index and pagination.

## Steps to Run Application

Follow these steps to set up and run the API on your local machine:

1. **Requirements**:
   
    Nodejs and MongoDB should be installed on your computer. Install nodemon globally using below command in terminal:
    ```bash
    npm install -g nodemon
    ```

2. **Clone the Repository**:
   
    clone repository using below command
    ```bash
    git clone https://github.com/your-username/simple-blog-api.git
    ```

3. **Change Branch**
    
    checkout to development branch
    ```bash
    git checkout development
    ```

4. **Install Dependencies**
    
    Install required npm packages using below command in root directory 
    ```bash
    npm install
    ```

5. **Setting Enviroment Variables**

    Create config.env file in your root directory and add following environment variables:
    - PORT: Port in which to run application
    - DATABASE: MongoDB database connection url

7. **Run Application**

    Run application using below command:
    ```bash
    npm start
    ```
    The application will start running on configured PORT.

8. **API Documentation**

    To open the swagger API documentation change server url according to your configured port in api-docs.yaml file. Run API documentation using below url in your browser:
    ```bash
    http://localhost:{PORT}/Blog/api-docs/