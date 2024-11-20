# School Management System

The **School Management System** is a RESTful API built for managing schools efficiently. It allows administrators to manage students, teachers, and classes with features like authentication, CRUD operations, and profile management.

---

## GitHub Repository

[School Management System](https://github.com/Ch1nmayH/School-Management-System)

---

## Features

- **Admin Management**: Secure login with `bcrypt`-hashed passwords. Admins can manage other administrators, teachers, students, and classes.
- **Teacher Management**: Add, update, delete, and fetch teacher profiles with a default avatar assigned from Cloudinary upon creation.
- **Student Management**: Manage students, including adding them to classes, updating their profiles, and assigning a default Cloudinary avatar during creation.
- **Class Management**: Create and manage classes with the ability to assign teachers (a dummy teacher is assigned by default if not specified) and track student counts.
- **Cloudinary Integration**: Upload profile pictures or avatars for students and teachers.
- **Authentication**: Middleware ensures proper authorization for all sensitive actions, including role-based access for admins, teachers, and students.
- **Login for Students and Teachers**: Students and teachers log in using their respective unique IDs.

---

## Setup and Installation

1. Clone the Repository:
    ```bash
    git clone https://github.com/Ch1nmayH/School-Management-System.git
    cd School-Management-System
    ```

2. Install Dependencies:
    ```bash
    npm install
    ```

3. Configure Environment Variables:  
    Create a `.env` file in the root directory with the following variables:
    ```env
    PORT=5000
    MONGO_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
    DEFAULT_AVATAR_URL=<url-for-default-avatar>
    ```

4. Start the Server:
    ```bash
    npm start
    ```

---

## API Endpoints

### Admin API
```
- **GET /**: Returns a welcome message for the Admin API.
- **POST /addAdmin**: Add a new admin (requires admin authentication).
- **POST /login**: Admin login with email and password.
- **POST /logout**: Admin logout.
```
### Class API
```
- **GET /**: Returns a welcome message for the Class API.
- **POST /addClass**: Create a new class with a default dummy teacher assigned.
- **PUT /assignTeacher**: Assign a teacher to a class (requires admin authentication).
- **GET /getClass**: Fetch class details (requires admin authentication).
- **PUT /update**: Update class details (requires admin authentication).
- **DELETE /delete**: Delete a class (requires admin authentication).
```
### Student API
```
- **GET /**: Returns a welcome message for the Student API.
- **POST /login**: Student login using their ID and password.
- **POST /logout**: Student logout.
- **POST /addStudent**: Add a new student with a default Cloudinary avatar (requires teacher authentication).
- **GET /getStudent**: Fetch student details (requires teacher authentication).
- **PUT /update**: Update student details (requires student authentication).
- **DELETE /delete**: Delete a student (requires teacher authentication).
- **POST /uploadAvatar**: Upload a student’s profile picture (requires student authentication).
```
### Teacher API
```
- **GET /**: Returns a welcome message for the Teacher API.
- **POST /login**: Teacher login using their ID and password.
- **POST /logout**: Teacher logout.
- **POST /addTeacher**: Add a new teacher with a default Cloudinary avatar (requires admin authentication).
- **GET /getTeacher**: Fetch teacher details (requires admin authentication).
- **PUT /update**: Update teacher details (requires teacher authentication).
- **DELETE /delete**: Delete a teacher (requires admin authentication).
- **POST /uploadAvatar**: Upload a teacher’s profile picture (requires teacher authentication).
```


### Authentication and Authorization
```
- **Middleware**:
    - **checkAdminAuth**: Verifies admin access.
    - **checkTeacherAuth**: Verifies teacher access.
    - **checkStudentAuth**: Verifies student access.
    - **Role-based Access**: Ensures only authorized users can perform specific actions.
```
### Additional Notes
```
- **All sensitive data is hashed and stored securely using bcrypt**.
- **Cloudinary is used for seamless avatar management**.
- **The system ensures robust role-based authentication and proper handling of resources**.
```
