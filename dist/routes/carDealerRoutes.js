"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carDealerController_1 = require("../controllers/carDealerController");
const router = (0, express_1.Router)();
router.route('/')
    .post(carDealerController_1.createCarDealer)
    .get(carDealerController_1.getAllCarDealer);
router.route('/:id')
    .get(carDealerController_1.getCarDealerById)
    .put(carDealerController_1.updateCarDealer)
    .delete(carDealerController_1.deleteCarDealer);
exports.default = router;
