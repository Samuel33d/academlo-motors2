import z from 'zod';
import { extractValidationData } from '../../commons/utils/extractValidationData.js';

const repairSchema = z.object({
  date: z.string(),
  motorsNumber: z.number(),
  description: z.string(),
  userId: z.number(),
});

export const validateRepair = (data) => {
  const result = repairSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: repairData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    repairData,
  };
};
