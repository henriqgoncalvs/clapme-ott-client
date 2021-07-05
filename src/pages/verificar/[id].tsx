import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { UserAPI } from 'core/api/fetchers';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

function VerififyEmail() {
  const { logout } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const handleVerifyEmail = async () => {
      try {
        const response = await UserAPI.verifyEmail({
          code: id,
        });

        if (response.status === 200) {
          if (logout)
            logout(
              'success',
              'Logue novamente na plataforma com as credenciais.',
            );
        } else {
          toast({
            position: 'top',
            title: 'Erro na verificação do email.',
            description: 'Verifique os campos e tente novamente.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          router.push('/');
        }
      } catch (err) {
        toast({
          position: 'top',
          title: 'Erro na verificação do email.',
          description: 'Verifique os campos e tente novamente.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        router.push('/');
      }
    };
    handleVerifyEmail();
  }, [id]);

  return <></>;
}

export default VerififyEmail;
