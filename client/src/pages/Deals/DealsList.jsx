import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loadDealsList } from "../../store/actions/deal.action";
import {Link} from "react-router-dom";

import {Container, Table, Badge} from "react-bootstrap";

import "./Orders.scss";

const getVariant = (status) => {
    switch (status) {
        case 'Confirmation':
            return 'info'
        case 'Not Paid':
            return 'warning'
        case 'Paid':
            return 'primary'
        case 'Completed':
            return 'success'
        case 'Canceled':
            return 'danger'
        default:
            return null
    }
}

const OrderItem = ({ index, description, status, amount, partner, onClick}) => {
    const variantStatus = getVariant(status);
    return (
        <tr className="order-item" onClick={onClick}>
            <td>{index + 1}</td>
            <td>{description}</td>
            <td><Badge variant={variantStatus}>{status}</Badge></td>
            <td>{amount} $</td>
            <td>{partner}</td>
        </tr>
    )
}


const Orders = ({ orders, login, loadDealsList }) => {
    const history = useHistory();

    React.useEffect( () => loadDealsList({login}), [])

    const orderHandler = (id) => () => history.push(`/orders/${id}`);

    return (
      <Container>
          <div className="orders bg-dark">
              <div className="orders__head">
                  <h3>Orders list</h3>
                  <Link to="/orders/new" className="create-order-link">Create new order</Link>
              </div>
              <div className="orders__body">
                  {!orders.length ? <>Order list is empty</> : <Table className="orders-list" striped bordered hover variant="dark" responsive="sm">
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

                      {orders.map(({_id, description, partner, status, amount }, index) => <OrderItem
                                  key={_id}
                                  index={index}
                                  description={description}
                                  status={status}
                                  amount={amount}
                                  partner={partner}
                                  onClick={orderHandler(_id)}
                              />
                          )}
                      </tbody>
                  </Table>}
              </div>
          </div>
      </Container>
    )
}

const mapStateToProps = (state) => ({
    login: state.auth.user.login,
    orders: state.deals.orders,
    loading: state.deals.loading
});

export default connect(mapStateToProps, { loadDealsList })(
    Orders
);
