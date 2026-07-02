import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';


// Stores every login attempt for security tracking.
const purchaseSchema = mongoose.Schema({
     
      product:{
            type:ObjectId,
            ref: 'product'
      },

      quantity:{ 
            type:Number,
      },
      
       purchased_price:{ 
            type:String,
      },

      regDate:{
            type:String,
      },
      
})


const Purchase = mongoose.model('purchase',purchaseSchema)
export default Purchase;