import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';


// Stores every login attempt for security tracking.
const reportSchema = mongoose.Schema({
     
      

      total_product:{ 
            type:Number,
            default:0,
      },

      total_sales:{ 
            type:Number,
            default:0,
      },

      total_amount:{ 
            type:Number,
            default:0,
      },
      
      

      first_sales_time:{
            type:String,
      },

      last_sales_time:{
            type:String,
      },
      today:{
            type:String,
      },
      regDate:{
            type:String,
      },
      
})


const Report = mongoose.model('report',reportSchema)
export default Report;