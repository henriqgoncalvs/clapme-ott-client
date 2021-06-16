import * as React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react';

import styleguide from '@root/styleguide.json';

function SocialMediaLinks(props: ButtonGroupProps) {
  const {
    footer: { social_links },
  } = styleguide;

  return (
    <ButtonGroup variant="ghost" color="solid-text-c" {...props}>
      {social_links?.whatsapp && (
        <IconButton
          as="a"
          href={social_links.whatsapp}
          aria-label="WhatsApp"
          icon={<FaWhatsapp fontSize="20px" />}
        />
      )}
      {social_links?.instagram && (
        <IconButton
          as="a"
          href={social_links.instagram}
          aria-label="Instagram"
          icon={<FaInstagram fontSize="20px" />}
        />
      )}
      {social_links?.email && (
        <IconButton
          as="a"
          href={`mailto:${social_links.email}`}
          aria-label="Email"
          icon={<IoMdMail fontSize="20px" />}
        />
      )}
    </ButtonGroup>
  );
}

export default SocialMediaLinks;
