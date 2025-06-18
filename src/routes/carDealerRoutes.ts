//  routing all files from list controllers 
import { Router } from 'express';
import {
  createcarDealer,
  findAllCarDealer,
  findByIdCarDealer,
  updateCarDealer,
  deleteCarDealer,
} from '../controllers/carDealerController';

const router = Router();

router.route('/')
  .get(createcarDealer)
  .post(findAllCarDealer);
router.route('/:id')
  .get(findByIdCarDealer)
  .put(updateCarDealer)
  .delete(deleteCarDealer);

export default router; 