import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Button
  } from 'reactstrap';
import OrdersTable from '../../components/Orders/BrokerOrdersTable';
import { getOrders }  from '../../redux/actions/OrderActions';
import {  useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
    useEffect(()=>{
      axios.get("http://localhost:5000/api/orders")
      // .then(res=>res.json())
      .then(res=> setOrders(res.data.data));
    },[]);
    const dispatch = useDispatch();

    console.log(orders,'orders data');

    // const orders = useSelector((state) => state.orders);
  

  useEffect(() => {
    dispatch(getOrders());
  },[orders])

  const handleClick = () => {
    history.push("/placeOrder")
  }
  console.log("orders",orders)
  return (
    <div>
        <Card>
            
              <CardHeader>Orders</CardHeader>
              <Button onClick={handleClick}color="primary" style={{width:"150px", marginLeft: "40px", marginTop: "30px"}}>Place Order</Button>

              <CardBody>
                <OrdersTable
                  headers={[
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
                    'Actions',
                    
                  ]}
                  usersData={orders}
                />
              </CardBody>
            </Card>
          
    </div>
  )
}