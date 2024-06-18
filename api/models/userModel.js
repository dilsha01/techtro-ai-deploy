import {Schema ,model}  from 'mongoose'

const userSchema = new Schema({
    username : {
        type : String,
        required : [true , "username is required"] , 
        unique : true
    },
    email : {
        type : String,
        required : [true, "email is required"],	
        unique : true,
        trim : true,
    },
    password : {
        type : String,
        required : [true, "password is required"],  
        min : 6
    },
    avatar : {
        type: String,
        default: ""
        
    },
    anykey : {
        type: String,
        default: ""
        
    },
     
    },{  timestamps : true}
);

const User = model("User" , userSchema);

export default User;