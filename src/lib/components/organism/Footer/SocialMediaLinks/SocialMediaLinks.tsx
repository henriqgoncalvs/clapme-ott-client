import * as React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react';

function SocialMediaLinks(props: ButtonGroupProps) {
  return (
    <ButtonGroup variant="ghost" color="solid-text-c" {...props}>
      <IconButton
        as="a"
        href="#"
        aria-label="WhatsApp"
        icon={<FaWhatsapp fontSize="20px" />}
      />
      <IconButton
        as="a"
        href="#"
        aria-label="Email"
        icon={<IoMdMail fontSize="20px" />}
      />
    </ButtonGroup>
  );
}

export default SocialMediaLinks;
