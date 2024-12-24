# Anyware-Task Dashboard

This project is a dashboard application built with React, Redux, TypeScript, and Material-UI. It includes features such as quizzes, announcements, and user authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/anyware-task-dashboard.git
   cd anyware-task-dashboard
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open the application in your browser:**

   [http://localhost:5173](http://localhost:5173)

## Usage

- **Login:**

  - as a teacher:
  - Email: `teacher@teacher.com`
  - Password: `123456789`

  - as a user:
  - Email: `user@user.com`
  - Password: `123456789`

- **Logout:**

  - Click on the logout tab in the top right corner of the screen and select `Logout`.

- **Quizzes:**

  - as an admin:
    - Create a new quiz by clicking on the `+` button .
    - Edit or delete a quiz by clicking on the `Edit` or `Delete` button.
  - as a user:
    - Take a quiz by clicking on the `Start Quiz` button.
    - View the quiz results by clicking on the `Submit Quiz` button.

- **Announcements:**

  - as an admin:
    - Create a new announcement by clicking on the `+` button.
    - Edit or delete an announcement by clicking on the `Edit` or `Delete` button.
  - as a user:
    - View the announcements on the dashboard.

## Features

- **Authentication:**
  - Users can log in and log out.
  - Admins can create, edit, and delete quizzes and announcements.
- **Quizzes:**
  - Admins can create quizzes with multiple-choice questions.
  - Users can take quizzes and view their results.
- **Announcements:**
  - Admins can create announcements.
  - Users can view announcements on the dashboard.

## Project Structure

The project is structured as follows:

- **`src/`**:

  - **`components/`**: Contains the React components.
  - **`interface/`**: Contains the TypeScript interfaces.
  - **`pages/`**: Contains the React pages.
  - **`redux/`**: Contains the Redux actions, reducers, and store.
  - **`routes/`**: Contains the React Router routes.
  - **`validations/`**: Contains the form validations.
  - **`README.md`**: The project documentation.

## API Endpoints

The project uses the following API endpoints:

- **`/api/auth`**:

  - **`POST /login`**: Log in with email and password.

- **`/api/quizzes`**:

  - **`GET /get?_id={id}`**: Get all quizzes.
  - **`POST /create`**: Create a new quiz.
  - **`PUT /update?_id={id}`**: Update a quiz.
  - **`DELETE /delete?_id={id}`**: Delete a quiz.

- **`/api/announcements`**:

  - **`GET /get?_id={id}`**: Get all announcements.
  - **`POST /create`**: Create a new announcement.
  - **`PUT /update?_id={id}`**: Update an announcement.
  - **`DELETE /delete?_id={id}`**: Delete an announcement.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

```

```
