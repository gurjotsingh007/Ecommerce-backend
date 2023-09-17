const mongoose = require("mongoose");
//family 4 is ip address
const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {family:4})
    .then((data)=>{
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDatabase;
//way suggested by mongoose
// const mongoose = require('mongoose');

// const connectDatabase = () => {
//     main().catch(err => console.log(err));

//     async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
//     .then(()=>{
//         console.log("Its Running")
//     })
//     .catch((err)=>{
//         console.log("its an error "+err);
//     })

//     // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
//     }
// }

// module.exports = connectDatabase;