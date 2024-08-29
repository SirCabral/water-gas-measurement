import * as Yup from 'yup';

const base64Pattern = /^data:image\/(png|jpg|jpeg|gif);base64,/;

const measureSchema = Yup.object().shape({
  image: Yup.string()
    .required('Image é obrigatório')
    .test('is-base64', 'Base64 Imagem é inválida', value => {
      if (!value) return false;
      const base64Data = value.split(',')[1];
      return base64Pattern.test(value) && base64Data && /^[A-Za-z0-9+/=]+$/.test(base64Data);
    }),
  customer_code: Yup.string().required('customer_code é obrigatório'),
  measure_datetime: Yup.date().required('measure_datetime é obrigatório'),
  measure_type: Yup.string().oneOf(['WATER', 'GAS'], 'measure type inválido').required('measure_type é obrigatório'),
});

export default measureSchema;