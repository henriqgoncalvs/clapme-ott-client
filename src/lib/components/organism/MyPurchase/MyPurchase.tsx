import { Box } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import dayjs from 'dayjs';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

const parseStatus = {
  paid: 'Pago',
} as Record<string, string>;

function MyPurchase() {
  const { boughtProducts } = useAuth();
  console.log(boughtProducts);
  return (
    <Box w="100%" overflowX="scroll">
      <Table variant="simple" size="sm" overflow="scroll" maxW="100%">
        <Thead>
          <Tr>
            <Th color="solid-c">Data</Th>
            <Th color="solid-c">Pedido</Th>
            <Th color="solid-c">Eventos</Th>
            <Th color="solid-c">Subtotal</Th>
            <Th color="solid-c">Desconto</Th>
            <Th color="solid-c">Total</Th>
            <Th color="solid-c">Status</Th>
            <Th color="solid-c"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {boughtProducts?.map((bp) => (
            <Tr key={bp.id}>
              <Td>{dayjs(bp.purchase_date).format('DD/MM/YYYY')}</Td>
              <Td>{bp.product[0].title}</Td>
              <Td>
                {bp.product[0].events.map((e, index) => (
                  <p key={e.id}>
                    {e.title} {index > 0 && '|'}{' '}
                  </p>
                ))}
              </Td>
              <Td>R$ {bp.total_price}</Td>
              <Td>R$ {bp.discount}</Td>
              <Td>R$ {bp.final_price}</Td>
              <Td>{parseStatus[bp.status] || bp.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default MyPurchase;
