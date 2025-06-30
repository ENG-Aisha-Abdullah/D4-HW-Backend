"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carMakeController_1 = require("../controllers/carMakeController");
const router = (0, express_1.Router)();
router.route('/')
    .post(carMakeController_1.createCarMaker)
    .get(carMakeController_1.getAllCarMakers);
router.route('/:id')
    .get(carMakeController_1.getCarMakeById)
    .put(carMakeController_1.updateCarMake)
    .delete(carMakeController_1.deleteCarMake);
// router.get('/dealer/:carDealerId', getAllCarDealer);
// Get cars by carMakerId
exports.default = router;
