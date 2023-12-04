import React, { useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Button
} from 'reactstrap';
import OrdersTable from '../../components/Orders/BrokerOrdersTable';
import { getOrders } from '../../redux/actions/OrderActions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

export default function OrderSuperAdminPage() {
  const API_BASE_URL = 'http://62.72.57.19:5000';
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  console.log(auth  , "auth");
  const { user: { role } } = auth;
  const columns = [
    'S No.',
    'Date',
    'Product Name',
    'Quantity',
    'Rate',
    'Packing Bardana',
    'Brokerage',
    'Delivery Time',
    'Firm Name',
    'Status',
    'Actions'
  ];

  if (role === "Super Admin") {
    columns.push("Purchase Actions");
    // columns.push("Sales Actions");
  }
  console.log(role, "role");
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/orders`)
      .then(res => res.json())
      .then(res => setOrders(res.data));
  }, []);
  const dispatch = useDispatch();
  console.log("orsrerrsrs", orders)

  useEffect(() => {
    dispatch(getOrders());
  }, [orders])

  const handleClick = () => {
    history.push("/placeOrder")
  }
  return (
    <div>
      <Card>

        <CardHeader>Orders</CardHeader>
        {
          role === "Broker" &&
          <Button onClick={handleClick} color="primary" style={{ width: "150px", marginLeft: "40px", marginTop: "30px" }}>Place Order</Button>

        }

        <CardBody>
          <OrdersTable
            headers={columns}
            usersData={orders}
          />

        </CardBody>
      </Card>
    </div>
  )
}
