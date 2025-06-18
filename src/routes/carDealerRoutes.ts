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
  .post(createcarDealer)
  .get(findAllCarDealer);
router.route('/:id')
  .get(findByIdCarDealer)
  .put(updateCarDealer)
  .delete(deleteCarDealer);

export default router; 