import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';


const transactionSchema = mongoose.Schema({
     
       user:{
            type:ObjectId,
            ref: 'user'
      },
       source:{
            type:String,
      },
       category:{
            type:String,
            default: 'not assigned'
      },
       session:{
            type:String,
            default: 'not assigned'
      },

       session:{
            type:String,
            default: 'not assigned'
      },
       status:{
            type:String,
            default: 'not assigned'
      },
       type:{
            type:String,
      },

       amount:{ 
            type:Number,
            default: 0,

      },

       description:{
            type:String,
      },
      

      regDate:{
            type:String,
      },
      
})


const Transaction = mongoose.model('transaction',transactionSchema)
export default Transaction;