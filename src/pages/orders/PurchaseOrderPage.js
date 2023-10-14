import React, { useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    FormGroup,
    Col,
    Button,
    Input,
    Row,
    Form,
    ModalFooter,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import { Label } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';


export default function PurchaseOrderPage() {
    const [order, setOrder] = useState([]);
    const [purchase, setPurchase] = useState([]);
    const [modalState, setModalState] = useState({
        modal: false,
        modal_backdrop: false,
        modal_nested_parent: false,
        modal_nested: false,
        backdrop: true,
    });
    const [vouchers, setVouchers] = useState([]);
    const [voucherId, setVoucherId] = useState();
    const [voucher, setVoucher] = useState({});
    const [acceptedWeight, setAcceptedDate] = useState(0);
    const [netQty,setNetQty] = useState(0);

    const toggle = () => {
        return setModalState({
            ...modalState,
            modal: !modalState.modal,
        });
    };
    const [deductions, setDeductions] = useState({
        freight: 0,
        dala: 0,
        kanta: 0,
        cd: 0,
        tds: 0,
        bardana: 0,
        brokerage: 0,
        commission: 0
    });

    const [optionalFields, setOptionalFields] = useState({
        vehicleNo: "",
        driverName: "",
        loadingIncharge: "",
        kantaSilipWeight: "",
        dalalName: ""
    })

    const [addFields, setAddFields] = useState({
        qty: 0,
        bardanaClaim: "",
        qualityClaimPercent: "",
        qualityClaim: ""
    })

    const [quantityData, setQuantityData] = useState({
        billingWeight: 0,
        kantaWeight: 0,
        qualityClaimPercent: '',
        qualityClaim: ''
    });

    const [freightAdd, setFrieghtAdd] = useState(0);
    const [freightSub, setFrieghtSub] = useState(0);
    const [commAdd, setCommAdd] = useState(0);
    const [commSub, setCommSub] = useState(0);

    const handleQuantityChange = (e) => {
        const { name, value } = e.target;
        // let minQty = addFields.qty
        // if (name === "billingWeight") {
        //     let newValue = value ? value : 0;
        //     minQty = Math.min(Number(newValue), Number(quantityData.kantaWeight))

        // }
        // if (name === "kantaWeight") {
        //     let newValue = value ? value : 0;
        //     minQty = Math.min(Number(quantityData.billingWeight), Number(newValue))

        // }
        // setAddFields(() => {
        //     return {
        //         ...addFields,
        //         qty: minQty

        //     }
        // })
        setQuantityData(() => {
            return {
                ...quantityData,
                [name]: parseInt(value)

            }
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setOptionalFields(() => {
            return {
                ...optionalFields,
                [name]: value

            }
        })
    }

    const handleItemChange = (e) => {
        const { name, value } = e.target;

        setAddFields(() => {
            return {
                ...addFields,
                [name]: value

            }
        })
    }

    const handleDeductionChange = (e) => {
        const { name, value } = e.target;

        setDeductions(() => {
            return {
                ...deductions,
                [name]: value

            }
        })
    }

    const id = localStorage.getItem("purchaseId");
    useEffect(() => {
        axios.get(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/${id}`)
            // .then(res => res.json())
            .then(res => {
                setPurchase(res.data.data[0].voucher);

                setDeductions(res.data.data[0].deductions);
                setOrder(res.data.data)
            });
        viewItem();
        viewAdditionalFields();
        getVouchers();
    }, []);

    const getVouchers = async () => {
      const res = await axios.get(`${'http://localhost:5000'}/api/voucher/viewVoucherDetails/${id}`);
      console.log("my response",res.data.data)
      setVouchers(res.data.data);

    }
    const updateVoucher = async (voucherId) => {
      const res = await axios.get(`${'http://localhost:5000'}/api/voucher/addVoucherAdditionalData/${voucherId}`);
      console.log("my response",res)
      setVouchers(res.data.data);

    }
    const addOptionalFields = async () => {
        await axios.post(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/addFields/${id}`,
            optionalFields
        );
        toast("Optional Field added Successfully");

    }
    const addItem = async () => {
        await axios.post(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/addItem/${id}`,
            addFields
        );
        toast("Item added Successfully");

    }
    const viewAdditionalFields = async () => {
        const res = await axios.get(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/viewOptionalFields/${id}`,
            addFields
        );
        setOptionalFields(res.data.data[0])
    }
    const viewItem = async () => {
        const res = await axios.get(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/viewItems/${id}`,
            addFields
        );
        setAddFields(res.data.data[0])
    }
    const handlePurchaseChange = (e, product, i) => {
        e.preventDefault();
        let oldPurchases = [...purchase];
        product[e.target.name] = e.target.value;
        oldPurchases[i] = product;
        setPurchase(oldPurchases);
    }

    console.log(vouchers, 'purchase state');

    const addNewPurchase = () => {
        let newPurchase = {
            
            name: '',
            quantity: 0,
            price: 0,
            unit: 0
        };
        setVouchers(oldState => [...oldState, newPurchase]);
    }

    const getTotalAmount = () => {
        let amount = 0;

        vouchers.map((v)=>{
            amount += v.quantity * v.price;
            return v;
        });
        return amount;
    }



    const savePurchase = (id) => {
        console.log("purrrrr",purchase);
        axios.post(`${'http://localhost:5000'}/api/voucher/addVoucherDetails/${voucherId}`, vouchers).then(res => console.log("my res",res));
        toast("Voucher data added Successfully");

    }

    const saveUpdateVoucher = (id) => {
      axios.put(`${'http://localhost:5000'}/api/voucher/addVoucherAdditionalData/${voucherId}`, quantityData)
      .then(res => console.log("my ressss",res))
      .then(() => { 
        toast("Voucher data updated Successfully");
        getVouchers();
        toggle();
      })
      .then(() => {
        setNetQty()
      });
      

      
    }

    const saveDeductions = async () => {
        let body = {
            ...deductions,
            freight: Number(deductions.freight) + Number(freightAdd) - Number(freightSub),
            commission: Number(deductions.commission) + Number(commAdd) - Number(commSub)
        }
        await axios.post(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/addDeductions/${id}`, body).then(res => console.log(res));
        toast("Deductions added Successfully");
    }

    const setModalData = (pur, id) => {
        toggle();
        setQuantityData({
          billingWeight: pur.billingWeight,
          kantaWeight: pur.kantaWeight,
          qualityClaimPercent: pur.qualityClaimPercent,
          qualityClaim: pur.qualityClaim
          })
          console.log(pur, 'pur data here');
          setVoucherId(id);
          pur.acceptedWeight = pur.billingWeight < pur.kantaWeight ? pur.billingWeight : pur.kantaWeight;
          setVoucher(pur);
    }

    console.log("Vouchersss", vouchers)
    return (
        <div>
            <Card>

                <CardHeader>Purchase Voucher</CardHeader>

                <CardBody style={{ marginLeft: "150px" }}>
                    {order.map((pur, index) => {
                        const today = new Date(pur.date);
                        const month = today.getMonth() + 1;
                        const year = today.getFullYear();
                        const date = today.getDate();
                        const currentDate = month + "/" + date + "/" + year;
                        return (
                            <div class="container">
                                <div class="row">

                                    <div class="col-sm-4">
                                        <Label style={{ fontWeight: "600" }}>Series : </Label>
                                        &nbsp; &nbsp;
                                        {pur.name}
                                    </div>
                                    <div class="col-sm-4">
                                        <Label style={{ fontWeight: "600" }}>Date : </Label>
                                        &nbsp; &nbsp;
                                        {currentDate}

                                    </div>
                                    <div class="col-sm-4">
                                        <Label style={{ fontWeight: "600" }}>Vch No : </Label>
                                        &nbsp; &nbsp;
                                        {pur.voucherId}
                                    </div>


                                </div>

                                <div class="row">
                                    <div class="col-sm-4">
                                        <Label style={{ fontWeight: "600" }}>Party : </Label>
                                        &nbsp; &nbsp;
                                        Ashok Bansal Ji Gajraula
                                    </div>
                                    <div class="col-sm-4">
                                        <Label style={{ fontWeight: "600" }}>Narration : </Label>
                                        <textarea rows={2} cols={35} placeholder='Enter comments here'>
                                        </textarea>
                                    </div>
                                    <div class="col-sm-4">

                                    </div>

                                </div>

                            </div>
                        )

                    })}


                </CardBody>
            </Card>

            <br />
            <Card>
                <CardBody>

                    <table>
                        <thead>
                            <th>Action</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Price(Rs.)</th>
                            <th>Amount(Rs.)</th>

                        </thead>

                        {vouchers.length > 0 &&
                        <>
                            <tbody>
                                {vouchers.map((pur, idx) => (
                                  <>
                                  {console.log(pur,'pur')}
                                    <tr key={idx}>
                                        <td>
                                            <Button onClick={() => setModalData(pur, pur.id)}>
                                                <EditIcon />
                                            </Button>
                                        </td>
                                        <th>
                                        <input name='name' onChange={(e) => handlePurchaseChange(e, pur, idx)} value={pur.name}></input>
                                        </th>
                                        <th>
                                            <input name='quantity' onChange={(e) => handlePurchaseChange(e, pur, idx)} value={pur.quantity}></input>
                                        </th>
                                        <th>
                                            <input name='unit' onChange={(e) => handlePurchaseChange(e, pur, idx)} value={pur.unit}></input>
                                        </th>
                                        <th>
                                            <input name='price' onChange={(e) => handlePurchaseChange(e, pur, idx)} value={pur.price}></input>
                                        </th>
                                        <th>
                                            <input value={pur.price * pur.quantity}></input>
                                        </th>
                                    </tr>
                                    <Modal
                                    isOpen={modalState.modal}
                                    toggle={toggle}
                                    >
                                    <ModalHeader toggle={toggle}>
                                    Voucher Details
                                    </ModalHeader>
                                    <ModalBody>
                                    <Form>
                                        {console.log(voucher,' voucher here')}
                                      <FormGroup>
                                        <Label for="qty">Billing Weight (Quantity in QTL)</Label>
                                        <Input
                                          type="number"
                                          name="billingWeight"
                                          placeholder="Enter Billing Weight"
                                          value={voucher.billingWeight || 0}
                                          onChange={(e) => handleQuantityChange(e)}
                                        />
                                      </FormGroup>
                                      <FormGroup>
                                        <Label for="qty">Kanta Weight</Label>
                                        <Input
                                          type="number"
                                          name="kantaWeight"
                                          placeholder="Enter Kanta Weight"
                                          value={voucher.kantaWeight || 0}
                                          onChange={(e) => handleQuantityChange(e)}
                    
                                        />
                                      </FormGroup>
                                    
                                      <FormGroup>
                                        <Label for="qty">Accepted Weight</Label>
                                        <br></br>
                                        {voucher.acceptedWeight}
                                      </FormGroup>
                                      <>
                                       
                                      
                                      <FormGroup>
                                        <Label for="bardanaClaim">Bardana Claim</Label>
                                        <Input
                                          type="text"
                                          name="bardanaClaim"
                                          placeholder="Enter Bardana Claim"
                                          value={voucher.bardanaClaim}
                                          onChange={(e) => handleQuantityChange(e)}
                    
                                        />
                                        
                                      
                                      </FormGroup>
                                     
                                      <FormGroup>
                                        <Label for="qualityClaimPercent">Quality Claim %</Label>
                                        <Input
                                          type="number"
                                          name="qualityClaimPercent"
                                          placeholder="Enter Quality Claim %"
                                          value={voucher.qualityClaimPercent}
                                          onChange={(e) => handleQuantityChange(e)}
                    
                                        />
                                      </FormGroup>
                                      <FormGroup>
                                        <Label for="qualityClaim">Rate Claim</Label>
                                        <Input
                                          type="text"
                                          name="qualityClaim"
                                          placeholder="Enter Quantity"
                                          value={voucher.rateClaim}
                                          onChange={(e) => handleQuantityChange(e)}
                    
                                        />
                                      </FormGroup>
                                      <FormGroup>
                                        <Label for="qualityClaim">Moisture</Label>
                                        <Input
                                          type="text"
                                          name="qualityClaim"
                                          placeholder="Enter Quantity"
                                          value={voucher.moisture}
                                          onChange={(e) => handleQuantityChange(e)}
                    
                                        />
                                      </FormGroup>

                                      </>
                                      
                                      {/* <FormGroup check row>
                                        <Col sm={{ size: 10, offset: 2 }}>
                                          <Button onClick={updateVoucher}>Submit</Button>
                                        </Col>
                                      </FormGroup> */}
                                    </Form>
                                  
                                        <br />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="primary"
                                            onClick={() => saveUpdateVoucher(pur.id)}>
                                            {/* submit data in state */}
                                            Save
                                        </Button>{' '}
                                        <Button
                                            color="secondary"
                                            onClick={() => toggle()}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                                </>
                                ))}
                            </tbody>
                             </>
                        }

                    </table>
                    <Row>
                        <Col>
                        Total Amount : {getTotalAmount()}
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "20px" }}>
                        <Col md="8">
                        </Col>
                        <Col md="3">
                            <button style={{ marginRight: "20px" }} onClick={() => addNewPurchase()} className='btn btn-primary'>Add New</button>
                            <button onClick={() => savePurchase(id)} className='btn btn-primary'>Save</button>
                        </Col>
                        <Col md="1">
                        </Col>
                    </Row>

                </CardBody>
            </Card>
            {/* modal start here  */}
            
            <br />
            <ToastContainer />
        </div>
    )
}
