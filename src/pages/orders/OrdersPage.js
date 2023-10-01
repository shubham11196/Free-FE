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
    let BASE_URL = `${process.env.API_BASE_URL}/api/orders`;
    useEffect(()=>{
      fetch(BASE_URL)
      .then(res=>res.json())
      .then(res=> setOrders(res.data));
    },[]);
    const dispatch = useDispatch();

    console.log(orders,'orders data');

    // const orders = useSelector((state) => state.orders);
  
    const userProgressTableData = [
        {
          name: 'Tom',
          date: '3 month ago',
          progress: 75,
        },
        {
          name: 'Jenny',
          date: '1 year ago',
          progress: 60,
        },
        {
          name: 'Sim',
          date: '2 hour ago',
          progress: 50,
        },
        {
          name: 'Christine',
          date: 'a month ago',
          progress: 40,
        },
        {
          name: 'Bread',
          date: '6 months ago',
          progress: 30,
        },
        {
          name: 'Dan',
          date: '2 years ago',
          progress: 25,
        },
      ];

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
