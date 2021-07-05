import { Button, Center, useToast } from '@chakra-ui/react';

import { UserAPI } from 'core/api/fetchers';

import AuthLayout from '@layout/AuthLayout';

function VerififyEmail() {
  const toast = useToast();

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
    <AuthLayout title="Verificar email">
      <Center>
        <Button
          size="md"
          mt={4}
          onClick={handleResendVerifyCode}
          variant="outline"
        >
          Reenviar código para email.
        </Button>
      </Center>
    </AuthLayout>
  );
}

export default VerififyEmail;
