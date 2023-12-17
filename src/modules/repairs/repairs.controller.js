import { AppError } from '../../commons/errors/appError.js';
import { catchAsync } from '../../commons/errors/catchAsync.js';
import { uploadFile } from '../../commons/utils/upload-file-cloud.js';
import { generateUUID } from '../../config/plugins/generate-uuid.plugin.js';
import { UserServices } from '../users/users.service.js';
import { validateRepair } from './repairs.schema.js';
import { RepairsServices } from './repairs.service.js';

export const createRepair = catchAsync(async (req, res, next) => {
  
  const bodyData = {
    date: req.body.date,
    motorsNumber: +req.body.motorsNumber,
    description: req.body.description,
    userId: +req.body.userId
  }
  const { hasError, errorMessage, repairData } = validateRepair(bodyData);
  
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      error: errorMessage,
    });
  }

  const path = `repair/${generateUUID()}-${req.file.originalname}`
  const photosUrl = await uploadFile.uploadToFireBase(path, req.file.buffer)

  repairData.photo = photosUrl

  const repair = await RepairsServices.create(repairData);

  return res.status(201).json({
    status: 'success',
    message: 'Repair created succesfully',
    repair: {
      date: repair.date,
      description: repair.description,
      motorsNumber: repair.motorsNumber,
      photo: repair.photo
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
    repair
  });
});

export const updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await RepairsServices.update(repair)



  return res.status(200).json({
    status: 'success',
    message: 'Repair updated succesfully',
  });
});

export const deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  
  if(repair.status === 'completed'){
    return next(new AppError('You cannot cancel a completed repair.'))
  }

  await RepairsServices.delete(repair)

  return res.status(204).json(null);
});
