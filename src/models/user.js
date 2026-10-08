import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({

      //contained in reg form
      first_name:{
            type:String,
      },
      last_name:{
            type:String,
      },
     
    email:{
            type:String,
      },
   
      password:{
            type:String,
      },

      income:{
            type:Number,
            default: 0,
      },

      expenditure:{
            type:Number,
            default: 0,
      },
      balance:{
            type:Number,
            default: 0,
      },
     
      
     
      regDate:{
            type:String,
      },
     
})

userSchema.pre('save', async function(next){

     // ONLY hash the password if it is new or being updated
           if (!this.isModified('password')) {
                 return next();
           }
     
           try {
                 const salt = await bcrypt.genSalt(12);
                 this.password = await bcrypt.hash(this.password, salt);
                 next();
           } catch (error) {
                 next(error);
           }
})

// userSchema.statics.login = async function(userName,password) {
      userSchema.statics.login = async function(email,password){
      const user = await User.findOne({email})
      if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                  return user
            }
            throw new Error('Invalid credentials. Please check your email and password.');
      }
       throw new Error('Invalid credentials. Please check your email and password.');
}

const User = mongoose.model('user',userSchema)
export default User;