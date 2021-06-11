import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';

import { UserAPI } from 'core/api/fetchers';
import { UpdateUserPass } from 'lib/types/user';
import * as validators from 'lib/validators';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

function PasswordChangeForm() {
  const { user } = useAuth();
  const toast = useToast();

  const handleUpdatePass = async (values: UpdateUserPass) => {
    try {
      const response = await UserAPI.updatePassword({
        id: user?.id,
        body: values,
      });

      if (response.status === 201) {
        toast({
          position: 'top',
          title: 'Senha editada com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        position: 'top',
        title: 'Erro na edição da senha.',
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
        return handleUpdatePass(values);
      }}
      validationSchema={validators.PassChangeSchema}
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

            <ButtonGroup>
              <Button
                size="lg"
                mt={4}
                isLoading={isSubmitting}
                disabled={!dirty}
                type="submit"
              >
                Editar dados
              </Button>
            </ButtonGroup>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default PasswordChangeForm;
