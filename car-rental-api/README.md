# Car Rental API

This is a simple REST API for managing car rentals, built with **Node.js**, **Express**, and **MongoDB**.

## Features
- User registration and login with JWT authentication.
- View user profile.
- List rental cars with filtering options.
- Secure endpoints with JWT.


## Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or remotely)
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
3. View User Profile
- URL: `/my-profile`
- Method: `GET`
- Headers:
`Authorization: Bearer <token>`

4. List Rental Cars
URL: `/rental-cars`
Method: `GET`
Query Parameters (optional):

**year**: Filter by year.
Example: `localhost:3000/rental-cars?year=2015`

**color**: Filter by color.
Example: `localhost:3000/rental-cars?color=white`

**steering_type**: Filter by steering type.
Example: `localhost:3000/rental-cars?steering_type=automatic`


**number_of_seats**: Filter by number of seats.
Example: `localhost:3000/rental-cars?number_of_seats=5`

# Testing
- Using Postman

1. Import the Postman collection (if available).

2. Test the endpoints:

- Register a user (**POST** `/register`).

- Login (**POST** `/login`) and copy the JWT token.

- Use the token to access protected endpoints (**GET** `/my-profile`).

