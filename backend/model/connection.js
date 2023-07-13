const mongoose = require('mongoose');


mongoose.connect(process.env.mongo_url).then(()=>{
    console.log("connected to Mongoose")
}).catch(err => console.log(err))

module.exports = mongoose;