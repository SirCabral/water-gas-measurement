import * as Yup from 'yup';

const measureSchema = Yup.object().shape({
  measure_uuid: Yup.string().uuid().required('measure_uuid é obrigatório'),
  confirmed_value: Yup.number().required('confirmed_value é obrigatório'),
});

export default measureSchema;