## Table of Contents
1.  [About The Project](#about-the-project)
2.  [Current Functionalities](#current-functionalities)
3.  [Technologies Used](#technologies-used)
4.  [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation (Backend)](#installation-backend)
    * [Installation (Frontend)](#installation-frontend)
5.  [How to Use](#how-to-use)
6.  [Project Structure Overview](#project-structure-overview)
7.  [Planned Enhancements](#planned-enhancements)
8.  [Contributing](#contributing)
9.  [License](#license)

---

## 1. About The Project

This is an ongoing project for a modern, full-stack web application aimed at streamlining resume creation and enhancing content quality using Artificial Intelligence. Built with the MERN (MongoDB, Express.js, React, Node.js) stack, this application provides users with an intuitive interface to input their resume details and leverages AI to generate compelling, ATS (Applicant Tracking System)-friendly descriptions. The ultimate goal is to provide a complete tool for job-seekers to craft professional and effective resumes.

## 2. Current Functionalities

As of now, the following key features have been implemented:

* **User Authentication:** Secure user registration and login system using JWT (JSON Web Tokens).
* **Comprehensive Resume Sections:** Users can input and manage data across a wide range of resume sections:
    * Education (supports multiple entries)
    * Flexible Skills (supports user-defined categories with multiple skills per category)
    * Projects (supports multiple entries, including fields for GitHub & Live Links)
    * Hackathons & Achievements (supports multiple entries)
    * Professional Development (supports multiple entries)
    * Licenses & Certifications (supports multiple entries)
    * Extra-Curricular Activities & Hobbies (supports multiple entries)
    * Interests (simple list)
    * Custom Sections (supports multiple user-defined sections with custom headings and content)
* **Persistent Data Storage:** All user and resume data is securely stored in a MongoDB database.
* **Intuitive Timeline Navigation:** A sidebar provides quick, scroll-to-section navigation within the resume builder form, guiding the user through the input process.
* **AI-Powered Content Enhancement (Google Gemini):**
    * Integrated with **Google Gemini 1.5 Flash** for intelligent text generation.
    * **Live in Projects Section:** Users can provide a basic project overview and a list of technologies. The AI then generates 3 distinct, action-oriented, and ATS-friendly bullet points that integrate all provided information.
* **Client-Side PDF Download:** Users can generate and download a clean, formatted PDF version of their resume directly from the browser. The PDF is designed for a simple black-and-white, text-based output, ensuring broad compatibility.
* **Modular Frontend Components:** The Resume Builder page is structured using reusable React components for each section, promoting maintainability and scalability.
* **Production-Ready Considerations:** Backend configured with CORS for secure cross-origin requests and both frontend/backend utilize environment variables for flexible configuration across development and deployment environments.

## 3. Technologies Used

**Frontend:**
* **React.js:** Building the interactive user interface.
* **Vite:** Fast development server and build tool.
* **Tailwind CSS:** Utility-first CSS framework for styling.
* **`react-router-dom`:** For client-side routing and navigation.
* **`html2canvas`:** To convert HTML resume content into an image for PDF generation.
* **`jspdf`:** To create and save the PDF document from the generated image.

**Backend:**
* **Node.js & Express.js:** The server-side runtime and web framework for API development.
* **MongoDB & Mongoose:** NoSQL database for flexible data storage and its ODM for data modeling.
* **JWT (JSON Web Tokens):** For secure, stateless user authentication.
* **`bcrypt`:** For secure password hashing.
* **`validator`:** For server-side data validation.
* **`cors`:** Middleware to handle Cross-Origin Resource Sharing policies.
* **`dotenv`:** Manages environment variables for secure configuration.
* **`@google/generative-ai`:** The official SDK for interacting with the Google Gemini API to power AI features.

## 4. Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

Ensure you have the following installed:
* Node.js (LTS version recommended)
* npm (Node Package Manager)
* MongoDB Atlas Account (for a cloud database, free tier is sufficient) or a local MongoDB instance.
* A Google AI Studio API Key for Gemini API access ([Get your API key here](https://aistudio.google.com/app/apikey)).

### Installation (Backend)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ai-resume-builder.git](https://github.com/Manvitha-M-Puthu/Resume-Builder.git)
    cd ai-resume-builder
    ```
    

2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3.  **Install backend dependencies:**
    ```bash
    npm install
    ```

4.  **Create a `.env` file:**
    In the `backend` directory, create a file named `.env` and add the following environment variables:
    ```dotenv
    # backend/.env
    PORT=3000
    MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster0.abcde.mongodb.net/resume-builder-db?retryWrites=true&w=majority
    JWT_SECRET=a_very_long_and_complex_random_string_for_jwt_security
    GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY_HERE
    ```
    * **`PORT`**: The port your backend server will run on (e.g., `3000`).
    * **`MONGO_URI`**: Your MongoDB connection string (from MongoDB Atlas).
    * **`JWT_SECRET`**: A strong, random string.
    * **`GEMINI_API_KEY`**: Your Google AI Studio API Key.

5.  **Run the backend server:**
    ```bash
    npm start
    # Or, if you have nodemon installed for automatic restarts during development:
    # nodemon server.js
    ```
    The server should start on `http://localhost:3000`.

### Installation (Frontend)

1.  **Navigate back to the project root and then into the frontend directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    In the `frontend` directory, create a file named `.env` and add the following:
    ```dotenv
    # frontend/.env
    VITE_BACKEND_URL=http://localhost:3000
    ```
    * **`VITE_BACKEND_URL`**: This must match the `PORT` your backend server is running on.

4.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The application should open in your browser, typically at `http://localhost:5173`.

## 5. How to Use

1.  **Access the Application:** Open your web browser and go to `http://localhost:5173`.
2.  **Register:** Navigate to the `/register` page and create a new user account.
3.  **Log In:** Use your newly created credentials to log in.
4.  **Build Your Resume:** You will be automatically redirected to the `/build` page, the main resume builder interface.
    * Use the **sidebar navigation** to jump between different resume sections.
    * Fill in your personal, educational, and professional details in the respective forms.
    * **For Projects:** Input a basic title, description, and technologies used. Click the "Generate AI Suggestions" button to get 3 ATS-friendly bullet points crafted by Gemini. You can then copy or apply your favorite suggestion.
    * Click the **"Save Resume"** button frequently to save your progress to the database.
5.  **Download PDF:** Once you are satisfied with your resume content, click the **"Download PDF"** button (located at the top of the main content area) to generate and save your resume as a `.pdf` file.

## 6. Project Structure Overview

ai-resume-builder/
├── backend/                  # Node.js/Express.js server
│   ├── controllers/          # Business logic for API endpoints
│   ├── middleware/           # Authentication middleware
│   ├── models/               # MongoDB Mongoose schemas
│   ├── routes/               # Defines API endpoints
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── server.js             # Entry point for backend
└── frontend/                 # React.js application
├── src/
│   ├── components/       # Reusable UI components (each resume section, preview)
│   ├── config/           # Frontend configurations
│   ├── pages/            # Main application views (Login, Register, Builder)
│   ├── App.jsx           # Main React router setup
│   ├── index.css         # Global styles & Tailwind directives
│   └── main.jsx          # React app entry point
├── .env                  # Environment variables
├── package.json
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js


## 7. Planned Enhancements

This project is under active development. Future planned features include:
* Extending AI content generation to more sections (Professional Development, Hackathons, Custom Sections).
* Offering multiple resume templates for varied styles.
* Allowing users to manage and switch between different resume versions.
* Implementing an AI-powered resume critique and feedback system.
* Improving UI/UX, especially for mobile responsiveness.

## 8. Contributing

As this is an ongoing project, contributions, ideas, and feedback are highly welcome!
If you find a bug or have a suggestion, please open an issue or submit a pull request.

