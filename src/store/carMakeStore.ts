// import { carDealer } from "../models/carDealer";
import { generateId } from "../utils/generate-id";
import { carMake } from "../models/carMake";

const carMakes: Map<string, carMake> = new Map();

const create = (data: Omit<carMake, "id">): carMake => {
    const id = generateId();
    const CarMake: carMake = {
        id,
        ...data, //  country, brandName >> carMake Model
    };

    carMakes.set(id, CarMake);
    return CarMake;
}


//   Return all carMake in storage..
const findAll = (): carMake[] => {
    return Array.from(carMakes.values());
}

//  Find one carMake by its ID.
// returns the carMake or undefined if not found
const findById = (id: string): carMake | undefined => {
    return carMakes.get(id);
}

const update = (id: string, data: Partial<Omit<carMake, "id">>): carMake | undefined => {
    const CarMake = carMakes.get(id);
    if (!CarMake) return undefined;

    const updatedCarMake: carMake = {
        ...CarMake,
        ...data,
    };
    carMakes.set(id, updatedCarMake);
    return updatedCarMake;
}

const deleteCarMake = (id: string): boolean => {
    return carMakes.delete(id);
}

export const carMakeStore = {
    create,
    findAll,
    findById,
    update,
    deleteCarMake,
};