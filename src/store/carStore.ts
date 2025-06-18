import { Car } from "../models/car";
import { generateId } from "../utils/generate-id";


const cars: Map<string, Car> = new Map();

const create = (data: Omit<Car, "id">): Car => {
    const id = generateId();
    const car: Car = {
        id,
        ...data, //  carDealerId, carMakerId, name, price, year, color, wheelsCount >> car Model
    };

    cars.set(id, car);
    return car;
}


//   Return all Car in storage..
const findAll = (): Car[] => {
    return Array.from(cars.values());
}

// by DealerId...
const findBycarDealerId = (carDealerId: string): Car[] => {
  return findAll().filter(car => car.carDealerId === carDealerId);
}

// by carMakerId...
const findBycarMakerId = (carMakerId: string): Car[] => {
  return findAll().filter(car => car.carMakerId === carMakerId);
}

//  Find one Car by its ID.
// returns the Car or undefined if not found
const findById = (id: string): Car | undefined => {
    return cars.get(id);
}

const update = (id: string, data: Partial<Omit<Car, "id">>): Car | undefined => {
    const car = cars.get(id);
    if (!car) return undefined;

    const updatedCar: Car = {
        ...car,
        ...data,
    };
    cars.set(id, updatedCar);
    return updatedCar;
}

const deleteCar = (id: string): boolean => {
    return cars.delete(id);
}

export const carStore = {
    create,
    findAll,
    findBycarDealerId,
    findBycarMakerId,
    findById,
    update,
    deleteCar,
};