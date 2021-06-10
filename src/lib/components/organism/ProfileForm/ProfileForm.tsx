import InputMask, { InputState } from 'react-input-mask';
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';

import * as validators from 'lib/validators';

function ProfileForm() {
  return (
    <Formik
      initialValues={{
        name: 'Henrique',
        email: 'henrique@gravidadezero.space',
        password: '123456',
        cpf: '10850753465',
        phone: '87988254611',
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      validationSchema={validators.LoginSchema}
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
                    mask="(99) 9 9999-9999"
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

              <Button size="lg" mt={4} variant="outline">
                Excluir conta
              </Button>
            </ButtonGroup>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default ProfileForm;
