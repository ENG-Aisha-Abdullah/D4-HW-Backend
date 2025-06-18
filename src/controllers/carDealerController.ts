import { Request, Response } from 'express';
import { carDealerStore } from '../store/carDealerStore';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';
import { carStore } from '../store/carStore';

export const createcarDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, city } = req.body;

    if (!name) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'Name is required',
      });
      return;
    }

    const CarDealer = carDealerStore.create({ name, email, city});
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

export const findAllCarDealer = async (_req: Request, res: Response): Promise<void> => {
  try {
    const carDealers = carDealerStore.findAll();
    res.status(OK).json({
      success: true,
      data: carDealers,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Car Dealer',
    });
  }
};

export const findByIdCarDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const CarDealer = carDealerStore.findById(req.params.id);
    if (!CarDealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car Dealer not found',
      });
      return;
    }

    const cars = carStore.findBycarDealerId(CarDealer.id);
    res.status(OK).json({
      success: true,
      data: {
        ...CarDealer,
        cars,
      },
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
    const CarDealer = carDealerStore.update(req.params.id, req.body);
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
    const deleted = carDealerStore.deletedCarDealer(req.params.id);
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
