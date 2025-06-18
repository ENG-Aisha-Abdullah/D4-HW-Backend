import { Request, Response } from 'express';
import { carStore } from '../store/carStore';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';

export const createCarByCarDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price, year, color, wheelsCount,carDealerId, carMakerId, } = req.body;
    if (!name) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'name is required',
      });
      return;
    }
       const findCar = carStore.findById(id);
    if (!findCar) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
      });
      return;
    }
    const cars = carStore.create({ carDealerId, carMakerId, name, price, year, color, wheelsCount });
    res.status(CREATED).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create Car',
    });
  }
};
      // create by carMakerId
// export const createCarByCarMakerId = async (req: Request, res: Response): Promise<void> => {
//   try {
//      const { carMakerId } = req.params;
//     const { name, price, year, color, wheelsCount } = req.body;
//     if (!name) {
//       res.status(BAD_REQUEST).json({
//         success: false,
//         error: 'name is required',
//       });
//       return;
//     }
//     const CarMake = carMakeStore.findById(carMakerId);
//     if (!CarMake) {
//       res.status(NOT_FOUND).json({
//         success: false,
//         error: 'Car not found',
//       });
//       return;
//     }
//     const item = carStore.create({ carDealerId, carMakerId, name, price, year, color, wheelsCount });
//     res.status(CREATED).json({
//       success: true,
//       data: item,
//     });
//   } catch (error) {
//     res.status(BAD_REQUEST).json({
//       success: false,
//       error: error instanceof Error ? error.message : 'Failed to create Car',
//     });
//   }
// };




// const findAll = (): Car[] => {
//     return Array.from(cars.values());
// }


export const findAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars = carStore.findAll();
    res.status(OK).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to findu car',
    });
  }
};
//
export const findCarBycarDealerId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { carDealerId } = req.params;
    const carbyDealerId = carStore.findBycarDealerId(carDealerId);
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
export const findBycarMakerId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { carDealeMakerId } = req.params;
    const carbyDealerId = carStore.findBycarMakerId(carDealeMakerId);
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
export const findCarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { carDealeById } = req.params;
    const carbyDealerId = carStore.findById(carDealeById);
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
export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cars = carStore.findById(id);
    if (!cars) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'car not found',
      });
      return;
    }


    const updatescar = carStore.update(id, req.body);
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

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id } = req.params;
    const cars = carStore.findById(id);
    if (!cars) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'List not found',
      });
      return;
    }
    carStore.deleteCar(id);
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

