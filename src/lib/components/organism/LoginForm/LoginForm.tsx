import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import Link from 'next/link';

import * as validators from 'lib/validators';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

function LoginForm() {
  const { login } = useAuth();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        if (login) return login(values);
      }}
      validationSchema={validators.LoginSchema}
    >
      {(props) => (
        <Form>
          <Container centerContent my="16">
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
            <Button
              size="lg"
              mt={4}
              isLoading={props.isSubmitting}
              type="submit"
            >
              Entrar
            </Button>
          </Container>

          <Center>
            <Stack direction={{ base: 'column', md: 'row' }} fontWeight="bold">
              <Text>Não tem uma conta?</Text>
              <Link href="/cadastro" passHref>
                <ChakraLink color="primary-c.500">Cadastre-se.</ChakraLink>
              </Link>
            </Stack>
          </Center>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
