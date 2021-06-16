import AuthLayout from '@layout/AuthLayout';

import VerifyEmailForm from '@organism/VerifyEmailForm';

function VerififyEmail() {
  return (
    <AuthLayout title="Verificar email">
      <VerifyEmailForm />
    </AuthLayout>
  );
}

export default VerififyEmail;
