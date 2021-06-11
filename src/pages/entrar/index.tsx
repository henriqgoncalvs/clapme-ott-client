import AuthLayout from '@layout/AuthLayout';

import LoginForm from '@organism/LoginForm';

function Entrar() {
  return (
    <AuthLayout title="ENTRAR">
      <LoginForm />
    </AuthLayout>
  );
}

export default Entrar;
