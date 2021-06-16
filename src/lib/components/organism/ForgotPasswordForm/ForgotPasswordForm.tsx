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
import { ForgotPass } from 'lib/types/api/auth';
import * as validators from 'lib/validators';

function RegisterForm() {
  const toast = useToast();
  const router = useRouter();

  const handleForgotPassword = async (values: ForgotPass) => {
    try {
      const response = await AuthAPI.forgotPass(values);

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
        router.push('/redefinir-a-senha');
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
        email: '',
      }}
      onSubmit={(values) => {
        return handleForgotPassword(values);
      }}
      validationSchema={validators.ForgotPassSchema}
    >
      {({ isSubmitting, dirty }) => (
        <Form>
          <Flex direction="column" maxW="md" mx="auto">
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
