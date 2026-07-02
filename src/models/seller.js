import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const sellerSchema = mongoose.Schema({

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
    contact:{
            type:String,
      },
    address:{
            type:String,
      },
    government_id_type:{
            type:String,
      },
    proof_address_type:{
            type:String,
      },
   
      password:{
            type:String,
      },
     
      
      total_product_sold:{
            type:Number,
            default: 0
      },
      amount_sold:{
            type:String,
            default: 0
      },
     
      
      is_active:{
            type:Boolean,
            default:false

      },
      is_email_verified:{
            type:Boolean,
            default:false

      },

      is_government_id_verified:{
            type:Boolean,
            default:false

      },

      is_address_verified:{
            type:Boolean,
            default:false

      },
      
      
      profile:{
            type:String,
      },

     
     
      otp:{
            type:String,
      },
      otp_expires_at:{
            type:String,
      },
      
      regDate:{
            type:String,
      },
     
})

sellerSchema.pre('save', async function (next) {
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
});

// schoolSchema.statics.login = async function(schoolSchemaName,password) {
sellerSchema.statics.login = async function (email, password) {
      const seller = await Seller.findOne({ email })
      if (seller) {
            const auth = await bcrypt.compare(password, seller.password);

            console.log(auth);
            if (auth) {
                  return seller
            } else {

                  // 'incorrect password'
                  throw new Error('Invalid credentials. Please check your email and password.');
            }
      } else {
            throw new Error('Invalid credentials. Please check your email and password.');

      }
}

const Seller = mongoose.model('seller',sellerSchema)
export default Seller;