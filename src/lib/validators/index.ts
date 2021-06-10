import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Campo é obrigatório'),
  password: Yup.string()
    .min(8, 'A senha precisa ser maior que 8 caracteres')
    .max(30, 'A senha tem que ser menor que 30 caracteres')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
      `A senha precisa ter:
        - 1 letra maiúscula\n
        - 1 letra minúscula\n
        - 1 caractere especial\n
      `,
    )
    .required('Campo é obrigatório'),
});
