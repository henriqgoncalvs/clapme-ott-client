import { Box, Flex } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';

import MyPurchase from '@organism/MyPurchase';
import ProfileForm from '@organism/ProfileForm';

function ProfileLayout() {
  return (
    <Flex w="100%" mx="auto" direction="column">
      <h1 className="mb-12">Minha conta</h1>

      <Tabs colorScheme="primary-c">
        <TabList>
          <Tab>Meus perfil</Tab>
          <Tab>Meus pedidos</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex w="100%" mx="auto" my="8" direction="column">
              <Box w="100%" flex="1">
                <ProfileForm />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <MyPurchase />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default ProfileLayout;
