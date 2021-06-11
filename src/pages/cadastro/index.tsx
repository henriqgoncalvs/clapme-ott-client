import AuthLayout from '@layout/AuthLayout';

import RegisterForm from '@organism/RegisterForm';

function Cadastro() {
  return (
    <AuthLayout title="Cadastre-se">
      <RegisterForm />
    </AuthLayout>
  );
}

export default Cadastro;
