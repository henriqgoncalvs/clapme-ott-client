import { FiPlusCircle } from 'react-icons/fi';
import { Button } from '@chakra-ui/button';
import { Box, Flex, Stack } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';

import FinishCart from '@organism/Cart/FinishCart';

function ProfileLayout() {
  return (
    <Flex w="100%" mx="auto" direction="column">
      <h1 className="mb-12">Minha conta</h1>

      <Tabs>
        <TabList>
          <Tab>Meus perfil</Tab>
          <Tab>Meus pedidos</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex w="100%" mx="auto" direction="column">
              <Stack
                direction={{ base: 'column', lg: 'row' }}
                spacing={{ base: '10', lg: '12' }}
              >
                <Box flex="0.3">
                  <Button
                    size="md"
                    mt={8}
                    type="submit"
                    w={300}
                    leftIcon={<FiPlusCircle />}
                  >
                    Continuar comprando
                  </Button>
                </Box>
                <Box w="100%" flex="1">
                  <FinishCart />
                </Box>
              </Stack>
            </Flex>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default ProfileLayout;
