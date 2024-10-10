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

    async getRestaurantByRestaurtantId(data){
        return await Restaurant.findOne({restaurantId:data})
    }
    
}


export const restaurantService = new RestaurantService()