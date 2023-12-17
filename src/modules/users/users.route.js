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
import { uploadSingle } from '../../config/plugins/upload.file.plugin.js';


export const router = express.Router();

router.post('/signup', uploadSingle('photo'), signUp);
router.post('/login', login);

router.use(protect);

router.get('/', findAllUsers);

router
  .route('/:id')
  .get(validateExistUser, findOneUser)
  .patch(validateExistUser, protectAccountOwner, updateUser)
  .delete(validateExistUser, protectAccountOwner, deleteUser);
