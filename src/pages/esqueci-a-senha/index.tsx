import AuthLayout from '@layout/AuthLayout';

import ForgotPasswordForm from '@organism/ForgotPasswordForm';

function Cadastro() {
  return (
    <AuthLayout title="Esqueci a senha">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default Cadastro;
