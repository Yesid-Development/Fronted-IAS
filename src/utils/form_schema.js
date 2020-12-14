import * as yup from 'yup';

const schema = yup.object().shape({
  idTechnician: yup
    .number()
    .integer('Solo numeros enteros')
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive('No se admiten numeros negativos')
    .required('Este campo es requerido')
    .max(2000000, 'limite de numeros alcanzado'),
  idService: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .integer('Solo numeros enteros')
    .positive('No se admiten numeros negativos')
    .required('Este campo es requerido')
    .max(2000000, 'limite de numeros alcanzado'),
});

export default schema;
