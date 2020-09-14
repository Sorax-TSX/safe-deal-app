import React from "react";
import {Link} from "react-router-dom";

import {Container, Table, Badge} from "react-bootstrap";

import "./Orders.scss";

const OrderItem = ({ name, status, amount, partner}) => {
    return (
        <tr className="order-item">
            <td>1</td>
            <td>{name}</td>
            <td><Badge variant={status}>{status}</Badge></td>
            <td>{amount} $</td>
            <td>{partner}</td>
        </tr>
    )
}


const Orders = () => {
    return (
      <Container>
          <div className="orders bg-dark">
              <div className="orders__head">
                  <h3>Orders list</h3>
                  <Link to="/orders/new" className="create-order-link">Create new order</Link>
              </div>
              <div className="orders__body">
                  <Table className="orders-list" striped bordered hover variant="dark" responsive="sm">
                      <thead>
                      <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Amount</th>
                          <th>Partner</th>
                      </tr>
                      </thead>
                      <tbody>
                          <OrderItem
                            name="Buy Iphone XS MAX"
                            status="info"
                            amount="11.00"
                            partner="Pidaras"
                          />
                          <tr className="order-item">
                              <td>1</td>
                              <td>Buy Iphone XS MAX</td>
                              <td><Badge variant="warning">Not Paid</Badge></td>
                              <td>11.00 $</td>
                              <td>Kpokos</td>
                          </tr>
                          <tr className="order-item">
                              <td>1</td>
                              <td>Buy Iphone XS MAX</td>
                              <td><Badge variant="primary">Paid</Badge></td>
                              <td>11.00 $</td>
                              <td>Kpokos</td>
                          </tr>
                          <tr className="order-item">
                              <td>1</td>
                              <td>Buy Iphone XS MAX</td>
                              <td><Badge variant="success">Сompleted</Badge></td>
                              <td>11.00 $</td>
                              <td>Kpokos</td>
                          </tr>
                          <tr className="order-item">
                              <td>1</td>
                              <td>Buy Iphone XS MAX</td>
                              <td><Badge variant="danger">Canceled</Badge></td>
                              <td>11.00 $</td>
                              <td>Kpokos</td>
                          </tr>
                      </tbody>
                  </Table>
              </div>
          </div>
      </Container>
    )
}

export default Orders;
