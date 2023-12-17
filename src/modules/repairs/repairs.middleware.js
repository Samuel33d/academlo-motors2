import { AppError } from '../../commons/errors/appError.js';
import { catchAsync } from '../../commons/errors/catchAsync.js';
import { RepairsServices } from './repairs.service.js';

export const validateExistRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await RepairsServices.findOne(id);

  

  if (!repair) {
    return next(new AppError(`repair with id ${id} not found`, 404));
  }

  req.repair = repair
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perfom this action.!', 403)
      );
    }
    next();
  };
};
