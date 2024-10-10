import mongoose, { Schema } from "mongoose";


const restaurantSchema = new Schema({
    restaurantName:{
        type:String,
        required:true
    },
    restauranAddress:{
        type:String
    },
    baseUrl:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        index:true
    },
    phoneNo:{
        type:String,
        required:true,
        index:true
    },
    restaurantId:{
        type:String,
        index:true
    },
    apiUrl:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true
    }
    
},{timestamps:true})



const Restaurant = mongoose.model('Resturant',restaurantSchema)

export default Restaurant


