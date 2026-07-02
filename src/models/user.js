import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({

      //contained in reg form
      full_name:{
            type:String,
      },
     
    email:{
            type:String,
      },
    contact:{
            type:String,
      },
    gender:{
            type:String,
      },
      password:{
            type:String,
      },
      role:{
            type:String,
            default: 'customer'
      },
      
      total_product_sold:{
            type:String,
            default: '0'
      },
      amount_sold:{
            type:String,
            default: '0'
      },
     
      
      is_blocked:{
            type:Boolean,
            default:false

      },
      is_deleted:{
            type:Boolean,
            default:false

      },
      
      profile:{
            type:String,
            default:'profile3.png'
      },

     
     
      regDate:{
            type:String,
      },
     
})

userSchema.pre('save', async function(next){
      const salt = await bcrypt.genSalt()
      this.password = await bcrypt.hash(this.password,salt)
      next()
})

// userSchema.statics.login = async function(userName,password) {
      userSchema.statics.login = async function(email,password){
      const user = await User.findOne({email})
      if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                  return user
            }
            throw new Error('incorrect password')
      }
      throw new Error('this user does not exist')
}

const User = mongoose.model('user',userSchema)
export default User;