"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateCar = exports.getCarById = exports.getCarsByCarMakerId = exports.getCarsByCarDealerId = exports.getAllCars = exports.createCar = void 0;
const car_1 = __importDefault(require("../models/car"));
const carDealer_1 = __importDefault(require("../models/carDealer"));
const carMake_1 = __importDefault(require("../models/carMake"));
const http_status_1 = require("../utils/http-status");
// 1- Create car
const createCar = async (req, res) => {
    try {
        const { carDealerId, carMakerId, name, price, year, color, wheelsCount } = req.body;
        if (!name) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'name is required',
            });
            return;
        }
        if (!price) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'price is required',
            });
            return;
        }
        if (!year) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'year is required',
            });
            return;
        }
        if (!color) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'color is required',
            });
            return;
        }
        if (!wheelsCount) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'wheels Count is required',
            });
            return;
        }
        const findCarDealer = await carDealer_1.default.findById(carDealerId);
        if (!findCarDealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'CarDealer not found',
            });
            return;
        }
        const findCarMaker = await carMake_1.default.findById(carMakerId);
        if (!findCarMaker) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'CarMaker not found',
            });
            return;
        }
        const cars = await car_1.default.create({ carDealerId, carMakerId, name, price, year, color, wheelsCount });
        res.status(http_status_1.CREATED).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create a Car',
        });
    }
};
exports.createCar = createCar;
// 2- Get all cars
const getAllCars = async (req, res) => {
    try {
        const cars = await car_1.default.find();
        if (!cars) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'CarMaker not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get car',
        });
    }
};
exports.getAllCars = getAllCars;
// 3- Get all cars by carDealerId
const getCarsByCarDealerId = async (req, res) => {
    try {
        const { carDealerId } = req.params;
        const cars = await car_1.default.find({ carDealerId }).populate("carDealerId carMakerId");
        if (!cars || cars.length === 0) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'No cars found for this dealer',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get cars by dealer',
        });
    }
};
exports.getCarsByCarDealerId = getCarsByCarDealerId;
// 4- Get all cars by carMakerId
const getCarsByCarMakerId = async (req, res) => {
    try {
        const { carMakerId } = req.params;
        const cars = await car_1.default.find({ carMakerId }).populate("carDealerId carMakerId");
        if (!cars || cars.length === 0) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'No cars found for this maker',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get cars by maker',
        });
    }
};
exports.getCarsByCarMakerId = getCarsByCarMakerId;
// 5- Get car by id
const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundCar = await car_1.default.findById(id).populate("carDealerId carMakerId");
        if (!foundCar) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'CarMaker not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: foundCar,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to findu car',
        });
    }
};
exports.getCarById = getCarById;
// 6- Get car by id
const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const cars = await car_1.default.findById(id);
        if (!cars) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'car not found',
            });
            return;
        }
        const updatescar = await car_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, {
            new: true,
            runValidators: true
        });
        res.status(http_status_1.OK).json({
            success: true,
            data: updatescar,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update car',
        });
    }
};
exports.updateCar = updateCar;
// 7-  Delete car by id
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const cars = await car_1.default.findById(id);
        if (!cars) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'List not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete car',
        });
    }
};
exports.deleteItem = deleteItem;
