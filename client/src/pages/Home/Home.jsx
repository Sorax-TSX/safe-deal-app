import React from "react";
import { Link } from "react-router-dom";
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
                    <Link to="/deals/new">
                       <Button variant="outline-info">Create New Deal</Button>
                    </Link>
                 </Card.Body>
              </Card>
           </Col>
        </Row>
     </Container>
   )
}

export default Home;
