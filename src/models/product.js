import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';


// Stores every login attempt for security tracking.
const productSchema = mongoose.Schema({
      user:{
            type:ObjectId,
            ref: 'user'
      },

      transaction:{
            type:ObjectId,
            ref: 'transaction'
      },


      name:{ 
            type:String,
      },
      category:{ 
            type:String,
      },
     
      quantity:{ 
            type:Number,
      },

       price:{ 
            type:Number,
      },

       purchased_price:{ 
            type:Number,
      },

       last_updated_quantity:{
            type:Number,
            default: 0,
      },


       percentage_in_stock:{
            type:Number,
            default: 100,

      },
       total_sold:{
            type:Number,
            default: 0,

      },

      

       image:{
            type:String,
      },
       is_deleted:{
            type:Boolean,
            default: false,
      },


      

      regDate:{
            type:String,
      },
      
})


const Product = mongoose.model('product',productSchema)
export default Product;