"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarMake = exports.updateCarMake = exports.getCarMakeById = exports.getAllCarMakers = exports.createCarMaker = void 0;
const carMake_1 = __importDefault(require("../models/carMake"));
const http_status_1 = require("../utils/http-status");
const createCarMaker = async (req, res) => {
    try {
        const { country, brandName } = req.body;
        if (!country) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'country is required',
            });
            return;
        }
        if (!brandName) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'brand Name is required',
            });
            return;
        }
        const CarMake = await carMake_1.default.create({ country, brandName });
        res.status(http_status_1.CREATED).json({
            success: true,
            data: CarMake,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create Car Maker',
        });
    }
};
exports.createCarMaker = createCarMaker;
const getAllCarMakers = async (_req, res) => {
    try {
        const carMakes = await carMake_1.default.find();
        res.status(http_status_1.OK).json({
            success: true,
            data: carMakes,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch ALL Car Maker',
        });
    }
};
exports.getAllCarMakers = getAllCarMakers;
const getCarMakeById = async (req, res) => {
    try {
        const CarMake = await carMake_1.default.findById(req.params.id);
        if (!CarMake) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car Maker not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: CarMake,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch Car Maker BY ID',
        });
    }
};
exports.getCarMakeById = getCarMakeById;
const updateCarMake = async (req, res) => {
    try {
        const CarMake = await carMake_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, {
            new: true,
            runValidators: true
        });
        if (!CarMake) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car Maker not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: CarMake,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update Car Maker',
        });
    }
};
exports.updateCarMake = updateCarMake;
const deleteCarMake = async (req, res) => {
    try {
        const deleted = await carMake_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car Maker not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: {},
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete Car Maker',
        });
    }
};
exports.deleteCarMake = deleteCarMake;
