import { Router } from 'express';
import validate from '../middlewares/validate';
import createMeasureValidation from '../validations/createMeasureValidation';
import MeasureController from '../controllers/MeasureController';
import updateMeasureValidation from '../validations/updateMeasureValidation';

const router = Router();

router.get('/:customer_code/list', MeasureController.index); // Rota para listagem
router.patch('/confirm',
  validate(updateMeasureValidation), MeasureController.update); // Rota para confirm
router.post('/upload',
  validate(createMeasureValidation), MeasureController.store); // Rota para upload

export default router;