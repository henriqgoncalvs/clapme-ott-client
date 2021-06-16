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

import { UserAPI } from 'core/api/fetchers';
import { VerifyEmail } from 'lib/types/api/auth';
import * as validators from 'lib/validators';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

function VerifyEmailForm() {
  const toast = useToast();
  const { logout } = useAuth();

  const handleVerifyEmail = async (values: VerifyEmail) => {
    try {
      const response = await UserAPI.verifyEmail({
        code: values.code.toString(),
      });

      if (response.status === 200) {
        if (logout)
          logout(
            'success',
            'Logue novamente na plataforma com as credenciais.',
          );
      }
    } catch (err) {
      toast({
        position: 'top',
        title: 'Erro na verificação do email.',
        description: 'Verifique os campos e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleResendVerifyCode = async () => {
    try {
      await UserAPI.resendVerifyCode();

      toast({
        position: 'top',
        title: 'Código reenviado com sucesso.',
        description: 'Verifique sua caixa de entrada.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch {
      toast({
        position: 'top',
        title: 'Erro no reenvio do código.',
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
        code: 0,
      }}
      onSubmit={(values) => {
        return handleVerifyEmail(values);
      }}
      validationSchema={validators.VerifyEmailSchema}
    >
      {({ isSubmitting, dirty }) => (
        <Form>
          <Flex direction="column" maxW="md" mx="auto">
            <Field name="code">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!(form.errors.code && form.touched.code)}
                  mb="6"
                >
                  <FormLabel htmlFor="code">Código</FormLabel>
                  <Input
                    {...field}
                    id="code"
                    type="number"
                    placeholder="Digite aqui seu código"
                  />
                  <FormErrorMessage>{form.errors.code}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button size="md" mt={4} onClick={handleResendVerifyCode}>
              Reenviar código para email.
            </Button>
            <Button
              size="lg"
              mt={4}
              isLoading={isSubmitting}
              disabled={!dirty}
              type="submit"
            >
              Validar email
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default VerifyEmailForm;
