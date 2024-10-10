import { Router } from "express";
import { createRestaurant, getAllRestaurants, getRestaurant } from "../controller/restaurant.controller.js";

const router = Router()


router.route("/create").post(createRestaurant)
router.route("/get").post(getRestaurant)
router.route("/").get(getAllRestaurants)


export default router