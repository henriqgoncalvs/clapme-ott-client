import { HeadingProps } from '@chakra-ui/layout';
import { Heading as ChakraHeading } from '@chakra-ui/react';

function Heading(props: HeadingProps) {
  return (
    <ChakraHeading
      as="h4"
      color="solid-text-c"
      fontSize="sm"
      fontWeight="semibold"
      textTransform="uppercase"
      letterSpacing="wider"
      {...props}
    />
  );
}

export default Heading;
