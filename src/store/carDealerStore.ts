import { carDealer } from "../models/carDealer";
import { generateId } from "../utils/generate-id";

const carDealers: Map<string, carDealer> = new Map();

const create = (data: Omit<carDealer, "id">): carDealer => {
    const id = generateId();
    const CarDealer: carDealer = {
        id,
        ...data, //  name, email, city >> carDealer Model
    };

    carDealers.set(id, CarDealer);
    return CarDealer;
}


//   Return all carDealer in storage..
const findAll = (): carDealer[] => {
  return Array.from(carDealers.values());
}

//  Find one carDealer by its ID.
// returns the carDealer or undefined if not found
const findById = (id: string): carDealer | undefined => {
  return carDealers.get(id);
}

const update = (id: string , data: Partial<Omit<carDealer, "id">>): carDealer | undefined =>{
const CarDealer = carDealers.get(id);
if(!CarDealer) return undefined;

const updatedCarDealer: carDealer = {
    ...CarDealer,
    ...data,
    };
carDealers.set(id, updatedCarDealer);
return updatedCarDealer;
}

const deletedCarDealer = (id: string): boolean => {
    return carDealers.delete(id);
}

export const carDealerStore = {
    create,
    findAll,
    findById,
    update,
    deletedCarDealer,
};