import React from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";

const Home = () => {
   return (
     <Container>
        <Row>
           <Col>
              <Card>
                 <Card.Header>Brief description of the project</Card.Header>
                 <Card.Body>
                    <Card.Title>Safe deal</Card.Title>
                    <Card.Text>
                       This type of service was created to securely conduct transactions between sellers and buyers.
                    </Card.Text>
                    <Button variant="outline-info">Create New Deal</Button>
                 </Card.Body>
              </Card>
           </Col>
        </Row>
     </Container>
   )
}

export default Home;
