# School Management System

## Description
This is a web application built with Next.js for managing school information. It allows users to register, log in, add new school entries, and view a list of existing schools. The application includes client-side form validation and secure API endpoints.

## Features
*   **User Authentication**: Register new users and log in with existing credentials.
*   **Add School**: Authenticated users can add new school details, including name, address, contact, email, and an image.
*   **View Schools**: Authenticated users can view a list of all added schools.
*   **Secure API Endpoints**: API routes are protected with JWT (JSON Web Token) authentication.
*   **Client-side Validation**: Forms include validation using Zod and React Hook Form.

## Technologies Used
*   **Frontend**: Next.js, React, Bootstrap
*   **Form Handling**: React Hook Form, Zod, @hookform/resolvers
*   **Authentication**: JSON Web Tokens (JWT), `bcryptjs` for password hashing, `js-cookie` for client-side cookie management.
*   **Database**: MySQL (via `mysql2/promise`)
*   **Styling**: Global CSS

## Setup and Installation
Follow these steps to get the project up and running on your local machine.

### Prerequisites
*   Node.js (LTS version recommended)
*   npm (comes with Node.js)
*   MySQL database (e.g., via XAMPP, WAMP, or a standalone MySQL server)

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd school-assignment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
1.  **Create Database**: Create a new MySQL database named `school_db`.
2.  **Create `users` table**:
    ```sql
    CREATE TABLE `users` (
      `id` INT AUTO_INCREMENT PRIMARY KEY,
      `email` VARCHAR(255) NOT NULL UNIQUE,
      `password` VARCHAR(255) NOT NULL
    );
    ```
3.  **Create `schools` table**:
    ```sql
    CREATE TABLE `schools` (
      `id` INT AUTO_INCREMENT PRIMARY KEY,
      `name` VARCHAR(255) NOT NULL,
      `address` VARCHAR(255) NOT NULL,
      `city` VARCHAR(255) NOT NULL,
      `state` VARCHAR(255) NOT NULL,
      `contact` VARCHAR(20) NOT NULL,
      `email_id` VARCHAR(255) NOT NULL,
      `image` VARCHAR(255) NOT NULL
    );
    ```
4.  **Update Database Credentials**: If your MySQL username or password is not `root` and empty respectively, update `src/lib/db.ts` with your correct credentials.
    ```typescript
    // src/lib/db.ts
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root', // Your MySQL username
      password: '', // Your MySQL password
      database: 'school_db',
    });
    ```

### 4. Running the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
1.  **Register**: Navigate to the `/signup` page to create a new user account.
2.  **Login**: Go to the `/login` page and log in with your registered credentials.
3.  **Add School**: After logging in, navigate to the `/addSchool` page to add new school information.
4.  **View Schools**: Access the `/showSchools` page to see the list of all schools.

## Contributing
Feel free to fork the repository and contribute to this project. Please open an issue first to discuss what you would like to change.

## License
This project is open source and available under the MIT License.