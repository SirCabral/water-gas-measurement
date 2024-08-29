import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

export default async function validateParamUUID(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const schema = Yup.object().shape({
      id: Yup.string().uuid('Must be a valid UUID.').required(),
    });

    await schema.validate(req.params, { abortEarly: false });

    return next();
  } catch (err) {
    const error = err as Yup.ValidationError;
    return res
      .status(400)
      .json({ error_code: 'INVALID_DATA', error_description: error.message });
  }
}
