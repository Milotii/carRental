# Car Rental API

This is a simple REST API for managing car rentals, built with **Node.js**, **Express**, and **MongoDB**.

## Features
- User registration and login with JWT authentication.
- Password encryption using **bcrypt** for secure storage.
- View user profile.
- List rental cars with filtering options.
- Secure endpoints with JWT.


## Prerequisites
- Node.js (v16 or higher)
- MongoDB 
- Git

## Steps

- Clone the repository:  
  Run `git clone https://github.com/Milotii/carRental.git` and then `cd carRental`.

- Install dependencies:  
  Run `npm install`.

- Start the server:  
  Run `node rent.js`.

The server will start at `http://localhost:3000`

## Environment Variables
The following environment variables are required:

- **`JWT_SECRET`**: Secret key for signing JWTs.  
  Example: `your-secret-key`

- **`MONGODB_URI`**: MongoDB connection string.  
  Example: `mongodb://localhost:27017/carRental`

# Endpoints
1. User Registration
- URL: `/register`
- Method: `POST`
- Request Body:
```json
{
  "fullName": "Test",
  "email": "test@test.com",
  "username": "test",
  "password": "test123"
}
```
- Response
```json
{
  "message": "User registered successfully",
  "userId": "67bcd0dff62b7ea7ec6bb542"
}
```
2. User Login
- URL: `/login`
- Method: `POST`
- Request Body: 
```json
{
    "username": "test",
    "password": "test123"
}
```
- Response
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pbG90aSIsImlhdCI6MTc0MDQyNzg5OCwiZXhwIjoxNzQwNDMxNDk4fQ.aXlqf-HeH7NKeNqWbQPn-eec-PUU171luXTDrn_dYisI6IkpXVCJ1"
}

```
3. View User Profile
- URL: `/my-profile`
- Method: `GET`
- Headers:
```
Authorization: Bearer <token>
```
- Response
```json
{
    "fullName": "Test",
    "email": "test@test.com",
    "username": "test"
}
```

4. List Rental Cars
- URL: `/rental-cars`
- Method: `GET`
- Query Parameters (optional):

**year**: Filter by year.
Example: `localhost:3000/rental-cars?year=2015`

**color**: Filter by color.
Example: `localhost:3000/rental-cars?color=white`

**steering_type**: Filter by steering type.
Example: `localhost:3000/rental-cars?steering_type=automatic`

**number_of_seats**: Filter by number of seats.
Example: `localhost:3000/rental-cars?number_of_seats=5`

- Response
```json
[
  {
    "_id": "60e84e45772d9c247d179ea7",
    "name": "Golf mk8",
    "price_per_day": 50.0,
    "year": 2015,
    "color": "black",
    "steering_type": "automatic",
    "number_of_seats": 5
  }
]
```

# Example Workflow

1. Register a user using `/register`.
2. Log in using `/login` and copy the JWT token.
3. Use the token to access `/my-profile`.
4. Use `/rental-cars` to list cars, with optional filters like **year**, **color**, **steering_type**, **number_of_seats**.  

