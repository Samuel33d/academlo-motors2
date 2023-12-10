import express from 'express';
import {
  deleteUser,
  findAllUsers,
  findOneUser,
  login,
  signUp,
  updateUser,
} from './users.controller.js';
import {
  protect,
  protectAccountOwner,
  validateExistUser,
} from './users.middleware.js';

export const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.use(protect);

router.get('/', findAllUsers);

router
  .route('/:id')
  .get(validateExistUser, findOneUser)
  .patch(validateExistUser, protectAccountOwner, updateUser)
  .delete(validateExistUser, protectAccountOwner, deleteUser);
