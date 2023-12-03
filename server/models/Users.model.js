import mongoose from "mongoose";
import crypto from "node:crypto"
import {getErrorMessage} from "../helper/dbErrorHandler.js"

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:"Username is Required",
        trim:true
    },
    about:String,
    profile:String,

    email:{
        type:String,
        trim:true,
        unique:"Email is Required",
        match:[/.+\@.+\..+/,"Please Fill in Valid Email Address"],
        required:"Email is Required...",
        
    },
   
    /**
     * 
     * The actual password string
     *  is not stored directly in 
     * the database for security purposes
     * and is handled separatel.

     */
    hashed_password:{
        type:String,
        required:"Password is required"
    },
   
    salt:String,
    /***
     *  each user password needs to be encrypted, validated, and
     * authenticated securely as a part of the user model.
     * 
     */
following: [{type: mongoose.Schema.ObjectId, ref: 'Users'}],
followers: [{type: mongoose.Schema.ObjectId, ref: 'Users'}]


    
},{timestamps:true});


    /*  The password string that's provided by the user
     *  is not stored directly in the user
     *  document. Instead, it is handled as a virtual field.
     *  
     */

    /**
     * 
     * When the password value is received on user creation or update,
     *  it is encrypted into
     * a new hashed value and set to the hashed_password field, along with the
     * unique salt value in the salt field.
     * */ 

    userSchema
 .virtual('password')
 .set(function(password) {
 this._password = password
 this.salt = this.makeSalt()
 this.hashed_password = this.encryptPassword(password)
 })
 .get(function() {

 return this._password
 })

  //*****************Encryption and authentication*****************


 userSchema.methods = {
    authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
    if (!password) return ''
    try {
    return crypto
    .createHmac('sha1', this.salt)
    .update(password)
    .digest('hex')
    } catch (err) {
        console.log(getErrorMessage(err))
    }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
        }
       }

//  validation

userSchema.path('hashed_password').validate(function() {
    if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
    }
   }, null)
   

const UserModel=mongoose.model('Users',userSchema);

export default UserModel;