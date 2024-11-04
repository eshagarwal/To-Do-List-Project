# 📝 ToDo List Full Stack Application

A modern, full-stack todo list application built with React and Express.js that helps you manage your tasks efficiently. [TRY IT NOW!](https://todolistclient-eta.vercel.app/)

## 🏗️ Project Structure

### 🖥️ ToDo List Server
- Backend API built with Express.js and Node.js
- Handles data persistence and business logic

### 🎨 ToDo List Client
- Frontend application developed with React.js, Vite and Tailwind CSS
- Provides an intuitive user interface for task management

## 🚀 Features

- Create, read, update, and delete tasks
- Mark tasks as complete or incomplete
- Filter tasks by status (all, active, completed)
- Responsive design for desktop and mobile devices

## 🛠️ Technologies Used

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Deployment**: Vercel (backend and frontend)

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/eshagarwal/To-Do-List-Project.git
cd To-Do-List-Project
```
   

2. Install dependencies for both client and server
```bash
cd client && npm install
cd ../server && npm install
````

3. Start the development servers
```bash  
# In the server directory
npm run dev

# In the client directory
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite)

## 📚 API Documentation

The backend server offers a REST API to manage todos. Below is a list of available endpoints.

### 🔹 Endpoints

#### 1. **Get All Todos**

- **URL**: `/todos`
- **Method**: `GET`
- **Description**: Retrieves all todos.
- **Response**: An array of todo objects.

  ```json
    {
      "status": "success",
      "data": [
        {
          "id": 1,
          "title": "Sample Todo",
          "completed": false,
          "createdAt": "2024-11-04T13:38:03.666Z"
        }
      ]
    }

#### 2. **Add a New Todo**

- **URL**: `/todos`
- **Method**: `POST`
- **Description**: Adds a new todo to the list.
- **Request Body**:

  ```json
  {
    "title": "New Todo"
  }

- **Response:**: The newly created todo object.

  ```json
    {
      "status": "success",
      "data": {
        "id": 2,
        "title": "New Todo",
        "completed": false,
        "createdAt": "2024-11-04T13:38:03.666Z"
      }
    }

#### 3. **Mark Todo as Complete**

- **URL**: `/todos/:id/complete`
- **Method**: `PUT`
- **Description**: Marks the completion status of a specified todo.
- **Response**: The updated todo object with the new completion status.

  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "Sample Todo",
      "completed": true,
      "createdAt": "2024-11-04T13:38:03.666Z"
    }
  }

#### 4. **Update a Todo Title**

- **URL**: `/todos/:id`
- **Method**: `PUT`
- **Description**: Updates the title of a specified todo.
- **Request Body**:

  ```json
  {
    "title": "Updated Todo Title"
  }

- **Response**: The updated todo object with the new completion status.
  ```json
  {
    "status": "success",
    "data": {
      "id": 2,
      "title": "Updated Todo Title",
      "completed": false,
      "createdAt": "2024-11-04T13:45:06.917Z"
    }
  }

#### 5. **Delete a Todo**

- **URL**: `/todos/:id`
- **Method**: `DELETE`
- **Description**: Deletes a specified todo by its ID.
- **Response**: A confirmation message or status indicating deletion success.

  ```json
  {
    "message": "Todo deleted successfully."
  }

## 📄 License

This project is licensed under the [MIT License](LICENSE).
