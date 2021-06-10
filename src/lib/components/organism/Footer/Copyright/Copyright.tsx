import { Text, TextProps } from '@chakra-ui/layout';

import styleguide from '@root/styleguide.json';

function Copyright(props: TextProps) {
  return (
    <Text fontSize="sm" color="solid-text-c" {...props}>
      &copy; {new Date().getFullYear()} {styleguide.type.brand}. Todos os
      direitos reservados.
    </Text>
  );
}

export default Copyright;
