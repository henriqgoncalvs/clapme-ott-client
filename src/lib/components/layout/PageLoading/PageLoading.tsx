import { Center, Container, Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

function PageLoading() {
  return (
    <Container w="100vw" h="100vh">
      <Center h="100%" w="100%">
        <Flex direction="column" align="center">
          <Spinner thickness="4px" color="primary-c.500" />
          <h1>Carregando...</h1>
        </Flex>
      </Center>
    </Container>
  );
}

export default PageLoading;
