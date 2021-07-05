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
import { useRouter } from 'next/router';

import { AuthAPI } from 'core/api/fetchers';
import { ResetPass } from 'lib/types/api/auth';
import * as validators from 'lib/validators';

type Props = {
  email: string;
  token: string;
};

function RegisterForm({ email, token }: Props) {
  const toast = useToast();
  const router = useRouter();

  const handleResetPassword = async (
    values: Omit<ResetPass, 'email' | 'token'>,
  ) => {
    try {
      const response = await AuthAPI.resetPass({
        ...values,
        email,
        token,
      });

      if (response.status === 200) {
        toast({
          position: 'top',
          title: 'Email enviado.',
          description:
            'Verifique sua caixa de entrada e siga as instruções para redefinir a senha.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        router.push('/entrar');
      }
    } catch (err) {
      toast({
        position: 'top',
        title: 'Erro na redefinição de senha.',
        description: 'Verifique os campos e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        password: '',
        password_confirmation: '',
      }}
      onSubmit={(values) => {
        return handleResetPassword(values);
      }}
      validationSchema={validators.ResetPassSchema}
    >
      {({ isSubmitting, dirty }) => (
        <Form>
          <Flex direction="column" maxW="md" mx="auto">
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

            <Button
              size="lg"
              mt={4}
              isLoading={isSubmitting}
              disabled={!dirty}
              type="submit"
            >
              Redefinir senha
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
