import React from "react";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const Footer = () => {
  return (
    <Container>
      <Card className='w-100 fixed-bottom mt-auto bg-light px-2'>
        <Card.Text>&copy; 2022</Card.Text>
      </Card>
    </Container>
  );
};

export default Footer;
