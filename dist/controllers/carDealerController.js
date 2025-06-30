"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarDealer = exports.updateCarDealer = exports.getCarDealerById = exports.getAllCarDealer = exports.createCarDealer = void 0;
const http_status_1 = require("../utils/http-status");
const carDealer_1 = __importDefault(require("../models/carDealer"));
const createCarDealer = async (req, res) => {
    try {
        const { name, email, city } = req.body;
        if (!name) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'Name is required',
            });
            return;
        }
        if (!email) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'Email is required',
            });
            return;
        }
        if (!city) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'City is required',
            });
            return;
        }
        const CarDealer = await carDealer_1.default.create({ name, email, city });
        res.status(http_status_1.CREATED).json({
            success: true,
            data: CarDealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create Car Dealer',
        });
    }
};
exports.createCarDealer = createCarDealer;
const getAllCarDealer = async (_req, res) => {
    try {
        const carDealers = await carDealer_1.default.find();
        res.status(http_status_1.OK).json({
            success: true,
            data: carDealers,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch all Car Dealer',
        });
    }
};
exports.getAllCarDealer = getAllCarDealer;
const getCarDealerById = async (req, res) => {
    try {
        const CarDealer = await carDealer_1.default.findById(req.params.id);
        if (!CarDealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car Dealer not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: CarDealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch Car Dealer',
        });
    }
};
exports.getCarDealerById = getCarDealerById;
const updateCarDealer = async (req, res) => {
    try {
        const CarDealer = await carDealer_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, {
            new: true, // ???
            runValidators: true // ???
        });
        if (!CarDealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car Dealer not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: CarDealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update Car Dealer',
        });
    }
};
exports.updateCarDealer = updateCarDealer;
const deleteCarDealer = async (req, res) => {
    try {
        const deleted = await carDealer_1.default.findByIdAndDelete(req.params.id); // مانحتاج نسوي زي التعديل اللي فوق
        if (!deleted) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car Dealer not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: deleted,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete Car Dealer',
        });
    }
};
exports.deleteCarDealer = deleteCarDealer;
