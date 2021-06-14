import * as Yup from 'yup';

const email = Yup.string().email().required('Campo é obrigatório');

const password = Yup.string()
  .min(8, 'A senha precisa ser maior que 8 caracteres')
  .max(30, 'A senha tem que ser menor que 30 caracteres')
  .required('Campo é obrigatório');

const password_confirmation = Yup.string().oneOf(
  [Yup.ref('password'), null],
  'Senhas precisam ser iguais',
);

const name = Yup.string().required('Campo é obrigatório');

const cpf = Yup.string()
  .matches(
    /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/,
    'Digite um CPF válido',
  )
  .required('Campo é obrigatório');

const phone = Yup.string()
  .matches(/(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/, 'Digite um número válido')
  .required('Campo é obrigatório');

export const LoginSchema = Yup.object().shape({
  email,
  password,
});

export const RegisterSchema = Yup.object().shape({
  name,
  email,
  password,
  password_confirmation,
  cpf,
  phone,
});

export const UpdateMeSchema = Yup.object().shape({
  name,
  email,
  cpf,
  phone,
});

export const PassChangeSchema = Yup.object().shape({
  password,
  password_confirmation,
});

export const ForgotPassSchema = Yup.object().shape({
  email,
});

export const ResetPassSchema = Yup.object().shape({
  email,
  token: Yup.string().required('Campo é obrigatório'),
  password,
  password_confirmation,
});
