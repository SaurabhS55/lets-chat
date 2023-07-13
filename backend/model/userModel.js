const mongoose=require('./connection')
const bcrypt=require('bcrypt')
const emailValidator=require('email-validator')
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email)}
            
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    avatar:{
        type:String,
    }
})
userSchema.pre('save', async function(next){
    // this.password=bcrypt.hashSync(this.password,10);
    this.password=bcrypt.hashSync(this.password,10);
    // this.confirmPassword=undefined
    try {
        const existingUser = await userModel.findOne({ email: this.email });
        if (existingUser) {
          const err = new Error('Email already exists');
          err.status = 400;
          return next(err);
        }
    
        next();
      } catch (error) {
        next(error);
      }
    // next();
})
const userModel=mongoose.model('user',userSchema)
module.exports=userModel;