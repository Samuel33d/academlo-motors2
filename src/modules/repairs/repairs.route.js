import express from 'express';
import {
  createRepair,
  deleteRepair,
  findAll,
  findOneRepair,
  updateRepair,
} from './repairs.controller.js';
import { restrictTo, validateExistRepair } from './repairs.middleware.js';
import { protect } from '../users/users.middleware.js';

export const router = express.Router();

router.use(protect);

router.post('/', createRepair);

router.use(restrictTo('employee'));
router.get('/', findAll);

router
  .route('/:id')
  .get(validateExistRepair, findOneRepair)
  .patch(validateExistRepair, updateRepair)
  .delete(validateExistRepair, deleteRepair);
