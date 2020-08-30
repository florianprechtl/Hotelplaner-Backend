# Hotelplaner-Backend

A hotel planer backend application written in Node.js with Typescript and MongoDB

# Goal of this project

Using everything I learned from my Node.js Udemy course

# Most important middlewares used in the project

- mongoose
- express
- body-parser

# Starting Instructions

1. You have to add a `config/default.json` in which you define your secrets/credentials, like this:
   ```
   {
   "mongoURI": "mongodb+srv://<username>:<password>@<mongdbAddress>?retryWrites=true&w=majority",
   "jwtSecret": "jwtSecretToken",
   "jwtExpiration": 360000
   }
   ```
2. `npm i`
3. `npm run tsc`
4. `npm run server` -> stop after finnished
5. `npm run start` -> backend is now running
