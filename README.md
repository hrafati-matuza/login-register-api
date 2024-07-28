Login and Signup Application
============================

This is a web application built with Next.js, Express, and Passport.js for user authentication. The application provides user registration, login, and a simple route to test the database connection.

Features
--------

-User Registration
-User Login
-Authenticated Routes
-Database Connectivity
-Environment Variable Configuration

Technologies Used
-----------------

-[Next.js](https://nextjs.org/)
-[Express.js](https://expressjs.com/)
-[Passport.js](http://www.passportjs.org/)
-[MySQL](https://www.mysql.com/)
-[bcrypt](https://www.npmjs.com/package/bcrypt)
-[dotenv](https://www.npmjs.com/package/dotenv)
-[axios](https://www.npmjs.com/package/axios)
-[cors](https://www.npmjs.com/package/cors)

Prerequisites
-------------

-[Node.js](https://nodejs.org/) (v14.x or later)
-[npm](https://www.npmjs.com/) (v6.x or later)

Getting Started
---------------

Clone the Repository
--------------------

sh

Copy code

`git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name`

Install Dependencies
--------------------

sh

Copy code

`npm install`

Setup Environment Variables
---------------------------

Create a `.env` file in the root directory of your project with the following content:

dotenv

Copy code

`DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
SESSION_SECRET=your_session_secret`

Replace `your_password`, `your_database_name`, and `your_session_secret` with your actual MySQL password, database name, and a secret for session management, respectively.

Database Setup
--------------

Ensure your MySQL server is running and create a database for your application:

sql

Copy code

`CREATE DATABASE your_database_name;`

Run the Application
-------------------

Copy code

`npm run dev`

This will start your Next.js application on `http://localhost:3000`

To star the server run:

Copy code

`npm run server`

This will start your Express server on `http://localhost:3001`.

Explanation of Main Files
-------------------------

-**db.js**: Configures the MySQL connection using environment variables.
-**passportConfig.js**: Sets up Passport.js for user authentication.
-**server.js**: The main Express server file that sets up middleware, routes, and starts the server.
-**.env**: Stores environment variables for database connection and session management.
