import { Request, Response } from 'express';
import { carMakeStore } from '../store/carMakeStore';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';
import { carStore } from '../store/carStore';

export const createCarMakeStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country, brandName } = req.body;

    if (!country) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'country is required',
      });
      return;
    }

    const CarMake = carMakeStore.create({ country, brandName, });
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

export const findAllCarDealer = async (_req: Request, res: Response): Promise<void> => {
  try {
    const carMakes = carMakeStore.findAll();
    res.status(OK).json({
      success: true,
      data: carMakes,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Car Maker',
    });
  }
};

export const indByIdCarMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const CarMake = carMakeStore.findById(req.params.id);
    if (!CarMake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car Maker not found',
      });
      return;
    }

    const cars = carStore.findBycarMakerId(CarMake.id);
    res.status(OK).json({
      success: true,
      data: {
        ...CarMake,
        cars,
      },
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Car Maker',
    });
  }
};
export const updateCarMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const CarMake = carMakeStore.update(req.params.id, req.body);
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

export const deleteCarDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = carMakeStore.deleteCarMake(req.params.id);
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
