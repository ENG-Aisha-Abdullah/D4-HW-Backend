import { Request, Response } from 'express';
import car from '../models/car';
import carDealer from '../models/carDealer';
import carMake from '../models/carMake';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';


// 1- Create car
export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { carDealerId, carMakerId, name, price, year, color, wheelsCount } = req.body;
    if (!name) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'name is required',
      });
      return;
    }
    if (!price) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'price is required',
      });
      return;
    }
    if (!year) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'year is required',
      });
      return;
    }
    if (!color) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'color is required',
      });
      return;
    }
    if (!wheelsCount) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'wheels Count is required',
      });
      return;
    }

    const findCarDealer = await carDealer.findById(carDealerId);
    if (!findCarDealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'CarDealer not found',
      });
      return;
    }
    const findCarMaker = await carMake.findById(carMakerId);
    if (!findCarMaker) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'CarMaker not found',
      });
      return;
    }

    const cars = await car.create({ carDealerId, carMakerId, name, price, year, color, wheelsCount });
    res.status(CREATED).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create a Car',
    });
  }
};

// 2- Get all cars
export const getAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars = await car.find();
       if (!cars) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'CarMaker not found',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get car',
    });
  }
};

// 3- Get all cars by carDealerId
export const getCarsByCarDealerId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { carDealerId } = req.params;
    const carbyDealerId = await car.findById(carDealerId);
         if (!carbyDealerId) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'CarMaker not found',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: carbyDealerId,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to findu car',
    });
  }
};

// 4- Get all cars by carMakerId
export const getCarsByCarMakerId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { carDealeMakerId } = req.params;
    const carbyDealerId = await car.findById(carDealeMakerId);
             if (!carbyDealerId) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'CarMaker not found',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: carbyDealerId,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to findu car',
    });
  }
};

// 5- Get car by id
export const getCarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { carDealeById } = req.params;
    const carbyDealerId = await car.findById(carDealeById);
                 if (!carbyDealerId) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'CarMaker not found',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: carbyDealerId,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to findu car',
    });
  }
};

// 6- Get car by id
export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cars = await car.findById(id);
    if (!cars) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'car not found',
      });
      return;
    }
    const updatescar = await car.findByIdAndUpdate(
       req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(OK).json({
      success: true,
      data: updatescar,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update car',
    });
  }
};

// 7-  Delete car by id
export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cars = await car.findById(id);
    if (!cars) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'List not found',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete car',
    });
  }
};

