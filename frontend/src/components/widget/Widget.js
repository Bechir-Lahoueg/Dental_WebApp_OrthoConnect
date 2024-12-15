import React from 'react';
import { Card } from 'react-bootstrap';

const Widget = ({ title, count }) => {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{count}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Widget;
