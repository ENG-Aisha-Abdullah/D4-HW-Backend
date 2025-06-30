"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carController_1 = require("../controllers/carController");
const router = (0, express_1.Router)();
// Create & get all cars
router.route('/')
    .post(carController_1.createCar)
    .get(carController_1.getAllCars);
// Get cars by carDealerId
router.get('/dealer/:carDealerId', carController_1.getCarsByCarDealerId);
// Get cars by carMakerId
router.get('/maker/:carMakerId', carController_1.getCarsByCarMakerId);
// Get, update, delete by car _id
router.route('/:id')
    .get(carController_1.getCarById)
    .put(carController_1.updateCar)
    .delete(carController_1.deleteItem);
exports.default = router;
