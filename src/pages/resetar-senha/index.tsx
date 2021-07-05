import { useRouter } from 'next/router';

import AuthLayout from '@layout/AuthLayout';

import ResetPasswordForm from '@organism/ResetPasswordForm';

function Cadastro() {
  const router = useRouter();
  const { email, token } = router.query;

  if (email && token) {
    return (
      <AuthLayout title="Resetar a senha">
        <ResetPasswordForm email={email.toString()} token={token.toString()} />
      </AuthLayout>
    );
  }

  return <></>;
}

export default Cadastro;
