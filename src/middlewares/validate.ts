import * as Yup from 'yup';

import { Request, Response, NextFunction } from 'express';

export default function validate<T>(schema: Yup.AnySchema<T>) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const result = await schema.validate(req.body, { abortEarly: false });
      req.body = result;

      return next();
    } catch (err) {
      const error = err as Yup.ValidationError;
      return res
        .status(400)
        .json({ error_code: 'INVALID_DATA', error_description: error.message });
    }
  };
}
