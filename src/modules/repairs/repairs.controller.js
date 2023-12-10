import { catchAsync } from '../../commons/errors/catchAsync.js';
import { UserServices } from '../users/users.service.js';
import { validateRepair } from './repairs.schema.js';
import { RepairsServices } from './repairs.service.js';

export const createRepair = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, repairData } = validateRepair(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      error: errorMessage,
    });
  }

  const repair = await RepairsServices.create(repairData);

  return res.status(201).json({
    status: 'success',
    message: 'Repair created succesfully',
    repair: {
      id: repair.id,
      date: repair.date,
      description: repair.description,
      motorsNumber: repair.motorsNumber,
      userId: repair.userId,
    },
  });
});

export const findAll = catchAsync(async (req, res, next) => {
  const repairs = await RepairsServices.findAll();

  res.status(200).json({
    repairs,
  });
});

export const findOneRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  return res.status(200).json({
    repair: {
      id: repair.id,
      date: repair.date,
      motorsNumber: repair.motorsNumber,
      userId: repair.userId,
    },
  });
});

export const updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  console.log(repair);
  await RepairsServices.update(repair);

  return res.status(200).json({
    status: 'success',
    message: 'Repair updated succesfully',
  });
});

export const deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await UserServices.delete(repair);

  return res.status(204).json(null);
});
