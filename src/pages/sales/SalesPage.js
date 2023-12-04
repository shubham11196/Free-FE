import React, { useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Button
} from 'reactstrap';
import SalesTable from '../../pages/sales/SalesTable';
import { getOrders } from '../../redux/actions/OrderActions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

export default function SalesPage() {
    const API_BASE_URL = 'http://62.72.57.19:5000';
    const [sales, setSales] = useState([]);
    const history = useHistory();
    const auth = useSelector(state => state.auth);
    console.log(auth, "auth");
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
        columns.push("Sales Actions");
    }
    console.log(role, "role");
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/sales`)
            .then(res => res.json())
            .then(res => setSales(res.data));
    }, []);
    const dispatch = useDispatch();
    console.log("salessss", sales)

    useEffect(() => {
        dispatch(getOrders());
    }, [sales])

    const handleClick = () => {
        history.push("/salesOrder")
    }
    return (
        <div>
            <Card>

                <CardHeader>Sales</CardHeader>
                {
                    role === "Broker" &&
                    <Button onClick={handleClick} color="primary" style={{ width: "150px", marginLeft: "40px", marginTop: "30px" }}>Place Order</Button>

                }

                <CardBody>
                    <SalesTable
                        headers={columns}
                        usersData={sales}
                    />

                </CardBody>
            </Card>

        </div>
    )
}
