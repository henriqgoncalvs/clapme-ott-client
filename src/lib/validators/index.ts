import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Campo é obrigatório'),
  password: Yup.string()
    .min(8, 'A senha precisa ser maior que 8 caracteres')
    .max(30, 'A senha tem que ser menor que 30 caracteres')
    .required('Campo é obrigatório'),
});

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Campo é obrigatório'),
  email: Yup.string().email().required('Campo é obrigatório'),
  password: Yup.string()
    .min(8, 'A senha precisa ser maior que 8 caracteres')
    .max(30, 'A senha tem que ser menor que 30 caracteres')
    .required('Campo é obrigatório'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Senhas precisam ser iguais',
  ),
  cpf: Yup.string()
    .matches(
      /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/,
      'Digite um CPF válido',
    )
    .required('Campo é obrigatório'),
  phone: Yup.string()
    .matches(/(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/, 'Digite um número válido')
    .required('Campo é obrigatório'),
});
