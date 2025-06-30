import { Request, Response } from 'express';
import carMake from '../models/carMake';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';

export const createCarMaker = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country, brandName } = req.body;

    if (!country) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'country is required',
      });
      return;
    }
    if (!brandName) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'brand Name is required',
      });
      return;
    }

    const CarMake = await carMake.create({ country, brandName });
    res.status(CREATED).json({
      success: true,
      data: CarMake,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create Car Maker',
    });
  }
};

export const getAllCarMakers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const carMakes = await carMake.find();
    res.status(OK).json({
      success: true,
      data: carMakes,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch ALL Car Maker',
    });
  }
};

export const getCarMakeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const CarMake = await carMake.findById(req.params.id);
    if (!CarMake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car Maker not found',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: CarMake,
    });

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Car Maker BY ID',
    });
  }
};
export const updateCarMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const CarMake = await carMake.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true
      }
    );
    if (!CarMake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car Maker not found',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: CarMake,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update Car Maker',
    });
  }
};

export const deleteCarMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await carMake.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car Maker not found',
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
      error: error instanceof Error ? error.message : 'Failed to delete Car Maker',
    });
  }
}; 
