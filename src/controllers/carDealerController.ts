import { Request, Response } from 'express';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';
import carDealer from '../models/carDealer';

export const createCarDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, city } = req.body;

    if (!name) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'Name is required',
      });
      return;
    }
    if (!email) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'Email is required',
      });
      return;
    }
    if (!city) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'City is required',
      });
      return;
    }

    const CarDealer = await carDealer.create({ name, email, city });
    res.status(CREATED).json({
      success: true,
      data: CarDealer,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create Car Dealer',
    });
  }
};

export const getAllCarDealer = async (_req: Request, res: Response): Promise<void> => {
  try {
    const carDealers = await carDealer.find();
    res.status(OK).json({
      success: true,
      data: carDealers,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch all Car Dealer',
    });
  }
};

export const getCarDealerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const CarDealer = await carDealer.findById(req.params.id);
    if (!CarDealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car Dealer not found',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: CarDealer,
    });

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Car Dealer',
    });
  }
};

export const updateCarDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const CarDealer = await carDealer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,  // ???
        runValidators: true // ???
      }
    );
    if (!CarDealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car Dealer not found',
      });
      return;
    }
    res.status(OK).json({
      success: true,
      data: CarDealer,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update Car Dealer',
    });
  }
};

export const deleteCarDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await carDealer.findByIdAndDelete(req.params.id); // مانحتاج نسوي زي التعديل اللي فوق
    if (!deleted) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car Dealer not found',
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
      error: error instanceof Error ? error.message : 'Failed to delete Car Dealer',
    });
  }
}; 
