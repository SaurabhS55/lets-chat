const mongoose=require('./connection')
const messageSchema=new mongoose.Schema({
   message:{
    text:{
        type:String,
        required:true
    },
},
users:Array,
sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
},{timestamps:true})
const messageModel=mongoose.model('messages',messageSchema)
module.exports=messageModel;