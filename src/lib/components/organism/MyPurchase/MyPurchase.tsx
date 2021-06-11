import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';

function MyPurchase() {
  return (
    <Box w="100%" overflowX="scroll">
      <Table variant="simple" size="sm" overflow="scroll" maxW="100%">
        <Thead>
          <Tr>
            <Th color="solid-c">Data</Th>
            <Th color="solid-c">Pedido</Th>
            <Th color="solid-c">Evento</Th>
            <Th color="solid-c">Subtotal</Th>
            <Th color="solid-c">Total</Th>
            <Th color="solid-c">Status</Th>
            <Th color="solid-c"></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>30/05/2021</Td>
            <Td>#850328</Td>
            <Td>O terno</Td>
            <Td>R$ 100,00</Td>
            <Td>R$ 100,00</Td>
            <Td>Pago</Td>
            <Td>
              <Button size="sm">Assistir</Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}

export default MyPurchase;
