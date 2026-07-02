import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';


const cartSchema = mongoose.Schema({
     
       transactionID:{
            type:String,
      },
       master:{
            type:Boolean,
            default:false
      },
      product:{
            type:ObjectId,
            ref: 'product'
      },

      customer:{
            type:ObjectId,
            ref: 'user'
      },

      staff:{
            type:ObjectId,
            ref: 'user'
      },

      quantity:{ 
            type:Number,
            default: 0,
      },
      price:{ 
            type:Number,
            default: 0,

      },
      
       paid:{
            type:Boolean,
            default:false

      },

      regDate:{
            type:String,
      },
      
})


const Cart = mongoose.model('cart',cartSchema)
export default Cart;