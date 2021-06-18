import InputMask, { InputState } from 'react-input-mask';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';

import { AuthAPI } from 'core/api/fetchers';
import { RegisterUser } from 'lib/types/api/auth';
import * as validators from 'lib/validators';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

function RegisterForm() {
  const { login } = useAuth();
  const toast = useToast();

  const handleRegister = async (values: RegisterUser) => {
    try {
      const response = await AuthAPI.register(values);

      if (response.status === 201) {
        toast({
          position: 'top',
          title: 'Usuário criado com sucesso.',
          description: 'Verifique sua caixa de email.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        if (login) {
          return login({
            email: values.email,
            password: values.password,
          });
        }
      }
    } catch (err) {
      toast({
        position: 'top',
        title: 'Erro na criação do usuário.',
        description: 'Verifique os campos e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  console.log(process?.env.NEXT_PUBLIC_COMPANY_TOKEN);
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        cpf: '',
        phone: '',
      }}
      onSubmit={(values) => {
        return handleRegister({
          ...values,
          company_token: process?.env.NEXT_PUBLIC_COMPANY_TOKEN,
          cpf: values.cpf.replaceAll('.', '').replace('-', ''),
        });
      }}
      validationSchema={validators.RegisterSchema}
    >
      {({ isSubmitting, setFieldValue, dirty }) => (
        <Form>
          <Flex direction="column" maxW="md" mx="auto">
            <Field name="name">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!(form.errors.name && form.touched.name)}
                  mb="6"
                >
                  <FormLabel htmlFor="name">Nome</FormLabel>

                  <Input
                    {...field}
                    id="name"
                    type="name"
                    placeholder="Digite aqui seu nome"
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!(form.errors.email && form.touched.email)}
                  mb="6"
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Digite aqui seu email"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!(form.errors.password && form.touched.password)}
                  mb="6"
                >
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Digite aqui sua senha"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password_confirmation">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    !!(
                      form.errors.password_confirmation &&
                      form.touched.password_confirmation
                    )
                  }
                  mb="6"
                >
                  <FormLabel htmlFor="password_confirmation">
                    Confirme a senha
                  </FormLabel>
                  <Input
                    {...field}
                    id="password_confirmation"
                    type="password"
                    placeholder="Digite aqui sua senha"
                  />
                  <FormErrorMessage>
                    {form.errors.password_confirmation}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="cpf">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!(form.errors.cpf && form.touched.cpf)}
                  mb="6"
                >
                  <FormLabel htmlFor="cpf">CPF</FormLabel>
                  <InputMask
                    {...field}
                    mask="999.999.999-99"
                    name="cpf"
                    onChange={(e) => {
                      const value = e.target.value || '';
                      setFieldValue('cpf', value);
                    }}
                  >
                    {(inputProps: InputState) => (
                      <Input
                        id="cpf"
                        placeholder="Digite aqui seu CPF"
                        {...inputProps}
                      />
                    )}
                  </InputMask>
                  <FormErrorMessage>{form.errors.cpf}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="phone">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!(form.errors.phone && form.touched.phone)}
                  mb="6"
                >
                  <FormLabel htmlFor="phone">Número de telefone</FormLabel>
                  <InputMask
                    {...field}
                    mask="(99) 99999-9999"
                    name="phone"
                    onChange={(e) => {
                      const value = e.target.value || '';
                      setFieldValue('phone', value);
                    }}
                  >
                    {(inputProps: InputState) => (
                      <Input
                        {...inputProps}
                        id="phone"
                        type="phone"
                        placeholder="Digite aqui seu telefone"
                      />
                    )}
                  </InputMask>
                  <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              size="lg"
              mt={4}
              isLoading={isSubmitting}
              disabled={!dirty}
              type="submit"
            >
              Criar conta
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
