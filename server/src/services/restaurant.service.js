import Restaurant from "../models/restaurant.model.js";



class RestaurantService{

    async createRestaurant(data){
        return await Restaurant.create(data)
    }
    
    async getAllRestaurants(){
        return await Restaurant.find({});
    };
    
    
    async getRestaurantByBaseUrl(data){
        return await Restaurant.findOne({baseUrl:data})
    }

    async getSingleRestaurant(data){
        // return await Restaurant.findOne({restaurantId:data})
        return await Restaurant.findOne({ $or:[{baseUrl:data},{restaurantId:data}]})
    }
}


export const restaurantService = new RestaurantService()