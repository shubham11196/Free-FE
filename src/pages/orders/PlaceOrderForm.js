import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
import { getThemeColors } from 'utils/colors';
import Page from '../../components/Page';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forms from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PlaceOrderForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [logdata, setData] = useState({
    productName: "",
    rate: "",
    brokerage: "",
    deliveryTime: "",
    firmName: "",
    quantity: "",
    bardanas: "",
    date: new Date(),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(() => {
      return {
        ...logdata,
        [name]: value
      }
    })
  };
  const onSubmit = async () => {
    const res = await axios.post(`${process.env.API_BASE_URL}/api/orders/placeOrder`, logdata);
    toast("Order Placed Successfully");
    // history.push('/orders')

  }
  return (
    <div>
      <Page title="Place Order" breadcrumbs={[{ name: 'Place Order', active: true }]}>
        <Row>
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Please fill the following fields to place the order</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="firmName">Firm Name</Label>
                    <Input
                      type="text"
                      name="firmName"
                      placeholder="Enter Firm Name"
                      value={logdata.firmName}
                      onChange={handleChange}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="productName">Product Name</Label>
                    <Input
                      type="text"
                      name="productName"
                      placeholder="Enter Product Name"
                      value={logdata.productName}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="rate">Rate</Label>
                    <Input
                      type="text"
                      name="rate"
                      placeholder="Enter Product Rate"
                      value={logdata.rate}
                      onChange={handleChange}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="brokerage">Broker Name / Party Name</Label>
                    <Input
                      type="text"
                      name="brokerage"
                      placeholder="Enter Broker Name / Party Name"
                      value={logdata.brokerage}
                      onChange={handleChange}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="quantity">Quantity</Label>
                    <Input
                      type="number"
                      name="quantity"
                      placeholder="Enter Quantity"
                      value={logdata.quantity}
                      onChange={handleChange}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="bardanas">Bardana</Label>
                    {/* <Input
                      type="text"
                      name="bardanas"
                      placeholder="Enter Bardana"
                      value={logdata.bardanas}
                      onChange={handleChange}

                    /> */}
                    <select
                      value={logdata.bardanas}
                      name="bardanas"
                      style={{ width: "100%", height: "40px" }}
                      onChange={handleChange}
                    >
                      <option>Select Option</option>
                      <option>Jute</option>
                      <option>Plastic</option>
                      <option>Loose</option>
                      <option>FCI</option>

                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label for="deliveryTime">Delivery Time</Label>
                    <br />
                    <select
                      value={logdata.deliveryTime}
                      name="deliveryTime"
                      style={{ width: "100%", height: "40px" }}
                      onChange={handleChange}
                    >
                      <option>Select Number of Days</option>
                      <option>1 day</option>
                      <option>2 day</option>
                      <option>3 day</option>
                      <option>4 day</option>
                      <option>5 day</option>
                      <option>6 day</option>
                      <option>7 day</option>
                      <option>8 day</option>
                      <option>9 day</option>
                      <option>10 day</option>
                      <option>11 day</option>
                      <option>12 day</option>
                      <option>13 day</option>

                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label for="date">Select Date</Label>
                    <br />
                    <DatePicker name="date" value={startDate}
                      selected={startDate} onChange={(date) =>
                        setStartDate(date)} />
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button onClick={onSubmit}>Submit</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
      <ToastContainer />

    </div>
  )
}