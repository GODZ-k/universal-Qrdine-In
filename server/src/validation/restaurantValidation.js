import { z} from 'zod'


const createRestaurantSchema = z.object({
    restaurantName:z.string(),
    restaurantAddress:z.string(),
    baseUrl:z.string(),
    apiUrl:z.string().optional(),
    email:z.string().email(),
    phone:z.string().length(10)
})

const getRestaurantByIdSchema = z.object({
    restaurantId:z.string().optional(),
    restaurantUrl:z.string().optional()
})

export {
    createRestaurantSchema,
    getRestaurantByIdSchema
}