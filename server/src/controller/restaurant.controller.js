import { cache } from "../services/redis.js"
import { restaurantService } from "../services/restaurant.service.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { generateRestaurantId } from "../utils/utils.js"
import { createRestaurantSchema, getRestaurantByIdSchema } from "../validation/restaurantValidation.js"



const createRestaurant = async(req,res,next)=>{
    try {

        const inputData = req.body

        if(!inputData){
            return res.status(404).json(
                new ApiResponse(404,'','',"All fileds must be required",false)
            )
        }

        const payload =createRestaurantSchema.safeParse(inputData)

        if(!payload.success){
            return res.status(400).json(
                new ApiResponse(400,'','','Please enter valid input', false)
            )
        }

        const {restaurantName , restaurantAddress , email , phone ,baseUrl , apiUrl } = payload.data

        const isExists = await restaurantService.getRestaurantByBaseUrl(baseUrl)

        if(isExists){
            return res.status(400).json(
                new ApiResponse(false ,'',"Restaurant already registered")
            )
        }

        
        const restaurantId = await generateRestaurantId(restaurantName)
        
        
        if(!restaurantId){
            return res.status(500).json(
                new ApiResponse(false,'','Failed to generate restaurant Id')
            )
        }
        
        
        const restaurant = await restaurantService.createRestaurant({
            restaurantName,
            restaurantAddress,
            restaurantId,
            email,
            phoneNo:phone,
            baseUrl,
            apiUrl
        })


        return res.status(200).json(
            new ApiResponse(true,restaurant,'Restaurant created successfully')
        )        

    } catch (error) {
        next(error)
    }
}


const getRestaurant = async(req,res,next)=>{
    try {
        const inputData = req.body

        if(!inputData){
            return res.status(404).json(
                new ApiResponse(false,'',"All fileds must be required")
            )
        }
        
        const payload = getRestaurantByIdSchema.safeParse(inputData)

        if(!payload.success){
            return res.status(400).json(
                new ApiResponse(false,'','Please enter valid input')
            )
        }

        const { restaurantId , restaurantUrl } = payload.data

        if(restaurantUrl){

            const restaurant = await restaurantService.getSingleRestaurant(restaurantUrl.toLowerCase())

            if(!restaurant){
                return res.status(404).json(
                    new ApiResponse(false,'','Restaurant not found')
                )
            }

            return res.status(200).json(
                new ApiResponse(true,restaurant,'Restaurant Found successfully')
            )

        }

        const cacheKey = `restaurant_${restaurantId.toUpperCase()}`;

        const cachedRestaurant = await cache.getCachedData(cacheKey)

        if(cachedRestaurant){
            return res.status(200).json(
                new ApiResponse(true,cachedRestaurant,'Restaurant Found successfully')
            )
        }

        const restaurant = await restaurantService.getSingleRestaurant(restaurantId.toUpperCase())

        if(!restaurant){
            return res.status(404).json(
                new ApiResponse(false,'','Restaurant not found')
            )
        }

        if(!restaurant.isActive){
            return res.status(422).json(
                new ApiResponse(false,'','Restaurant is not active')
            )
        }

        await cache.setAndExpire(cacheKey,restaurant)

        return res.status(200).json(
            new ApiResponse(true,restaurant,'Restaurant Found successfully')
        )
        
    } catch (error) {
        next(error)
    }
}

const getAllRestaurants = async(req,res,next)=>{
    try {
        const cacheKey = 'restaurants'

        const cachedRestaurant = await cache.getCachedData(cacheKey)

        if(cachedRestaurant){
            return res.status(200).json(
                new ApiResponse(200,cachedRestaurant,'Restaurant Found successfully')
            )
        }

        const restaurant = await restaurantService.getAllRestaurants()

        if(!restaurant){
            return res.status(200).json(
                new ApiResponse(200,'','No restaurant found')
            )
        }

        await cache.setAndExpire(cacheKey,restaurant)

        return res.status(200).json(
            new ApiResponse(200,restaurant,'Restaurant found successfully')
        )

    } catch (error) {
        next(error)
    }
}


export {
    createRestaurant,
    getRestaurant,
    getAllRestaurants
}