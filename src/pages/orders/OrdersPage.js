import React, { useEffect, useState } from 'react'
// import {
//     Card,
//     CardBody,
//     CardHeader,
//   } from 'reactstrap';
// import OrdersTable from '../../components/Orders/OrdersTable';
import { getOrders }  from '../../redux/actions/OrderActions';
import {  useDispatch } from "react-redux";


export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
    let BASE_URL = `${'https://admin-backend-fjzy.onrender.com'}/api/orders`;
    useEffect(()=>{
      fetch(BASE_URL)
      .then(res=>res.json())
      .then(res=> setOrders(res.data));
    },[]);
    const dispatch = useDispatch();

    console.log(orders,'orders data');

    // const orders = useSelector((state) => state.orders);
  

  useEffect(() => {
    dispatch(getOrders());
  },[orders])


  return (
    <div>
        {/* <Card>
            
              <CardHeader>Orders</CardHeader>
              <CardBody>
                <OrdersTable
                  headers={[
                    'Order Type',
                    'Product Name',
                    'Date'
                  ]}
                  usersData={orders}
                />
              </CardBody>
            </Card> */}
          
    </div>
  )
}
