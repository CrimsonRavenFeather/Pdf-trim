This is a backend application developed using Node.js for interacting with MongoDB. It provides APIs for various functionalities such as file uploads, user authentication, and more.

Project Structure
The project structure is as follows:

uploads: This folder is used to store uploaded files.
updateUploads: This folder is used to store modified or updated files.
Dependencies
The application uses the following dependencies:

bcrypt: For hashing passwords securely.
dotenv: For loading environment variables from a .env file.
ejs: For rendering dynamic content in views.
express: For building the web server and defining API routes.
gridfs-stream: For storing large files in MongoDB using GridFS.
mongodb: The official MongoDB driver for Node.js.
mongoose: For modeling MongoDB schemas and interacting with the database.
multer: For handling file uploads.
nodemon: For automatically restarting the server during development.
path: For working with file and directory paths.
pdf-lib: For working with PDF files, such as creating, modifying, and extracting text.
Usage
To run the application, follow these steps:

Clone the repository.
Install the dependencies using npm install.
Create a .env file in the root directory and add necessary environment variables.
Start the server using npm start or nodemon.
Notes
Ensure that MongoDB is running and accessible from the application.
Configure the .env file with appropriate MongoDB connection details and any other required environment variables.
Feel free to explore the code and extend the functionality as needed for your application!
