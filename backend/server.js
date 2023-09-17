const app = require("./app");
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const path = require('path')
//Handling Uncaught Exception
//For console log like exceptions
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting Down the Server dur to Unhandled Exceeption');

    process.exit(1);
})

//congif
dotenv.config({path:"backend/config/config.env"});

//connecting to database
connectDatabase(); 

          
cloudinary.config({ 
    secure:true,
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});



//Unhandled Promise Rejection as mongo
process.on("unhandledRejection", (err)=>{
    console.log(`Error ${err.message}`);
    console.log('Shutting Down the Server dur to Unhandled Promise Rejection');

    server.close(()=>{
        process.exit(1);
    });
});