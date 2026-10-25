# PeopleFlow — Employee Management React Project

A professional, responsive employee management frontend for the assignment. Built with React, Vite, React Router, Bootstrap 5, Lucide icons and custom CSS.

## Included pages and components
- **Login** (`/login`) — polished demo sign-in page with demo credentials and show/hide password.
- **Home / Dashboard** (`/`) — summary cards and recent employees fetched from JSONPlaceholder.
- **Employees** (`/employees`) — searchable employee directory, refresh button and CSV export.
- **Employee Form** (`/employee-form`) — Name, Designation, Location and Salary fields with validation and submit confirmation.
- Reusable components: `Navbar`, `Sidebar`, `StatCard`, `EmployeeTable`, `LoadingState`.
- `AuthContext` for simple demo session state and protected routes.
- Responsive desktop and mobile styles.

## Requirements
Install Node.js LTS from https://nodejs.org/ if needed.

## Run in VS Code
1. Extract the ZIP.
2. Open VS Code → **File → Open Folder** → select `employee-management-pro`.
3. Open **Terminal → New Terminal**.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed in the terminal (normally `http://localhost:5173`).

## Demo login
- Email: `admin@peopleflow.demo`
- Password: `peopleflow123`

The login is a frontend demonstration only, not secure production authentication.

## Routes
- `/login` — sign in
- `/` — Home / Dashboard
- `/employees` — full employee directory
- `/employee-form` — add employee form

## API
Dashboard and Employees use:
`https://jsonplaceholder.typicode.com/users`

The API is demo data. The employee form shows a confirmation but does not persist new records because this assignment version does not include a backend/database.
