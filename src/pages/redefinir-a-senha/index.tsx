import AuthLayout from '@layout/AuthLayout';

import ResetPasswordForm from '@organism/ResetPasswordForm';

function Cadastro() {
  return (
    <AuthLayout title="Redefinir a senha">
      <ResetPasswordForm />
    </AuthLayout>
  );
}

export default Cadastro;
