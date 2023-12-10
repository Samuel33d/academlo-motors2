import { AppError } from '../../commons/errors/appError.js';
import { catchAsync } from '../../commons/errors/catchAsync.js';
import { verifyPassword } from '../../config/plugins/encripted-password.plugin.js';
import generateJWT from '../../config/plugins/generateJWT.js';
import { validateLogin, validateUpdate, validateUser } from './users.schema.js';
import { UserServices } from './users.service.js';

export const signUp = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      error: errorMessage,
    });
  }

  const user = await UserServices.create(userData)

  const token =  await generateJWT(user.id)

  return res.status(201).json({
    token
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }
  const user = await UserServices.findOneByEmail(userData.email);

  if (!user) {
    return next(new AppError('This account does not exist', 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Invalid credentials', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      emal: user.email,
      role: user.role,
    },
  });
});

export const findAllUsers = catchAsync(async (req, res, next) => {
  const users = await UserServices.findAll();

  res.status(200).json({
    data: users,
  });
});

export const findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateUpdate(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { user } = req;

  await UserServices.update(user, userData);

  return res.status(200).json({
    status: 'success',
    message: 'user updated succesfully',
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await UserServices.delete(user);

  return res.status(204).json(null);
});
