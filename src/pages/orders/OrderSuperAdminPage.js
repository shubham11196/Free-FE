import React, { useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Button
  } from 'reactstrap';
import OrdersTable from '../../components/Orders/BrokerOrdersTable';
import { getOrders }  from '../../redux/actions/OrderActions';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

export default function OrderSuperAdminPage() {
    const [orders, setOrders] = useState([]);
    // const role = localStorage.getItem("role");
    const history = useHistory();
    useEffect(()=>{
      fetch(`${'https://admin-backend-fjzy.onrender.com'}/api/orders`)
      .then(res=>res.json())
      .then(res=> setOrders(res.data));
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
  return (
    <div>
        <Card>
            
            <CardHeader>Orders</CardHeader>
            <Button onClick={handleClick}color="primary" style={{width:"150px", marginLeft: "40px", marginTop: "30px"}}>Place Order</Button>

            <CardBody>
                { true ?
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
                  'Purchase Actions'
                ]}
                usersData={orders}
              />
              :
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
                }
              
            </CardBody>
          </Card>
    </div>
  )
}
