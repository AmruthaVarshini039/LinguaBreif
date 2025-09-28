# LinguaBreif- Ai summariser & tranaslator
LinguaApp — A Modern MERN Stack Communication Platform
LinguaApp is a secure and modern web application built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Tailwind CSS. It provides a robust platform for user communication, featuring a clean interface and a scalable backend architecture.

Key Features
Secure User Authentication: User registration and login system with password protection using bcryptjs for hashing.
React-Based Frontend: A dynamic and responsive user interface built with React and bundled with Vite for a fast development experience.
Node.js & Express Backend: A powerful backend server to handle API requests, business logic, and database interactions.
MongoDB Integration: Uses Mongoose for elegant data modeling and interaction with a MongoDB database.
Modern Styling: Styled with Tailwind CSS for a utility-first, customizable design.
Client-Server Architecture: Uses Axios for seamless HTTP communication between the React frontend and the Express backend.
Concurrent Development Workflow: The frontend and backend can be run simultaneously with a single command using concurrently.
Getting Started
Follow these steps to set up and run the project locally.

1. Clone the Repository
git clone <your-repository-url>
cd <repository-name>
2. Install Dependencies
This project uses a single package.json to manage both frontend and backend dependencies.

npm install
3. Set Up Environment Variables
Create a file named .env in the root of the project. You will need to add your MongoDB connection string and any other necessary environment variables.

MONGO_URI="your_mongodb_connection_string"
PORT=5000
Note: The package.json also includes a script to start a Python backend ("start-backend": "python ./backend/app.py"). If you are using the Node.js backend (as suggested by the Express and Mongoose dependencies), you will need to create a server file (e.g., server.js) and modify the start-backend script accordingly.

4. Run the Application
The start script uses concurrently to run both the backend server and the frontend development server at the same time.

npm start
This command will:

Start the backend server (you may need to adjust the start-backend script in package.json to node server.js if you are using the Node.js stack).
Start the Vite frontend development server.
The application will be available at http://localhost:5173 (or another port specified by Vite).

Project Structure
/
├── node_modules/       # Project dependencies
├── .eslintrc.config.js # ESLint configuration
├── .gitignore          # Git ignore configuration
├── index.html          # Main HTML entry point for Vite
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Exact dependency versions
├── tailwind.config.js  # Tailwind CSS configuration (if present)
├── vite.config.js      # Vite configuration
└── src/                # React source files
    └── main.jsx        # Main React application entry point
Available Scripts
In the package.json file, you can find the following scripts:

npm run dev: Starts the Vite development server for the frontend.

npm run build: Bundles the React application for production.

npm run lint: Lints the project files using ESLint.

npm run preview: Serves the production build locally for previewing.

npm run start-all: Runs both the backend and frontend concurrently.
<img width="960" height="884" alt="image" src="https://github.com/user-attachments/assets/8bcf699b-579d-4cb7-8b7f-ce1228460e65" />
<img width="952" height="872" alt="image" src="https://github.com/user-attachments/assets/e9bc72ae-ae8f-464a-a82a-0f542cab824e" />
<img width="940" height="894" alt="image" src="https://github.com/user-attachments/assets/f14676af-f9df-45fe-9394-115206b18d57" />
<img width="649" height="905" alt="image" src="https://github.com/user-attachments/assets/c7bc1277-8272-4cc6-8b9a-222214f87e76" />



