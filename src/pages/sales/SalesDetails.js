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


export default function SalesDetails() {
    // const [order, setOrder] = useState([]);
    const [sales, setSales] = useState([]);
    const [purchase, setPurchase] = useState([]);
    const [modalState, setModalState] = useState({
        modal: false,
        modal_backdrop: false,
        modal_nested_parent: false,
        modal_nested: false,
        backdrop: true,
    });
    const [vouchers, setVouchers] = useState([]);
    const [newVoucherData, setNewVoucherData] = useState({
        name: "",
        quantity: 0,
        price: 0,
        billingWeight: 0,
        kantaWeight: 0,
        bardanaClaim: 0,
        moisture: 0,
        qualityClaim: 0,
        qualityClaimPercent: 0,
        rateClaim: 0,
        
    });
    const [voucherId, setVoucherId] = useState();
    const [voucher, setVoucher] = useState({});
    const [acceptedWeight, setAcceptedDate] = useState(0);
    const [netQty, setNetQty] = useState(0);

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

    const handleQuantityChange = (e,pur) => {
        const { name, value } = e.target;
        // voucher.acceptedWeight = pur.billingWeight < pur.kantaWeight ? pur.billingWeight : pur.kantaWeight;

        let minQty = voucher.quantity;
        if (name === "billingWeight") {
            let newValue = value ? value : 0;
            minQty = Math.min(Number(newValue), Number(voucher.kantaWeight))

        }
        if (name === "kantaWeight") {
            let newValue = value ? value : 0;
            minQty = Math.min(Number(voucher.billingWeight), Number(newValue))

        }
        
        // setAddFields(() => {
        //     return {
        //         ...addFields,
        //         qty: minQty

        //     }
        // })

        setVoucher(() => {
            return {
                ...voucher,
                [name]: value,
                acceptedWeight: minQty
            }
        })

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
    const viewAdditionalFields = async () => {
        const res = await axios.get(`${'http://localhost:5000'}/api/sales/viewOptionalFields/${id}`,
            addFields
        );
        console.log("fields", res.data.data[0])
        setOptionalFields(res.data.data[0])
    }
    const addOptionalFields = async () => {
        await axios.post(`${'http://localhost:5000'}/api/sales/addFields/${id}`,
            optionalFields
        );
        toast("Optional Field added Successfully");
    }
    const getTotalFreightDeductions = () => {
        let amount = Number(deductions.freight) + Number(deductions.dala) + Number(deductions.kanta)
            + Number(deductions.cd) + Number(deductions.tds) + Number(deductions.bardana) + Number(deductions.brokerage)
            + Number(deductions.commission)
        return amount;
    }
    const saveDeductions = async () => {
        let body = {
            ...deductions,
            freight: Number(deductions.freight) + Number(freightAdd) - Number(freightSub),
            commission: Number(deductions.commission) + Number(commAdd) - Number(commSub)
        }
        await axios.post(`${'http://localhost:5000'}/api/sales/salesVoucherDeductions/${id}`, body).then(res => console.log(res));
        toast("Deductions added Successfully");
    }

    const getTotalAmount = () => {
        let amount = 0;
        vouchers.map((v) => {
            amount += v.quantity * v.price;
            return v;
        });
        return amount;
    }

    const handleSalesChange = (e, product, i) => {
        e.preventDefault();
        let oldPurchases = [...purchase];
        product[e.target.name] = e.target.value;
        oldPurchases[i] = product;
        setPurchase(oldPurchases);
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

    const saveUpdateVoucher = (id) => {
        console.log("voucherss", voucher);
        axios.put(`${'http://localhost:5000'}/api/voucher/addVoucherAdditionalData/${voucherId}`, voucher)
            .then(res => console.log("my ressss", res))
            .then(() => {
                toast("Voucher data updated Successfully");
                getVouchers();
                toggle();
                    console.log("deductions", voucher)
            })
            .then(() => {
                setNetQty()
            });
    }

    const getVouchers = async () => {
        const res = await axios.get(`${'http://localhost:5000'}/api/voucher/viewVoucherDetails/${1}`);
        console.log("my voucher response", res)
        setVouchers(res.data.data);

    }
    const savePurchase = (id) => {
        console.log("purrrrr", purchase);
        axios.post(`${'http://localhost:5000'}/api/voucher/addVoucherDetails/${1}`, newVoucherData).then(res => console.log("my res", res));
        toast("Voucher data added Successfully");

    }

    const addNewPurchase = (id) => {
        savePurchase(id);
        // let newPurchase = {

        //     name: '',
        //     quantity: 0,
        //     price: 0,
        //     unit: 0
        // };

        // setVouchers(oldState => [...oldState, newPurchase]);
    }
    const id = localStorage.getItem("salesId");
    useEffect(() => {
        axios.get(`${'http://localhost:5000'}/api/sales/${id}`)
            // .then(res => res.json())
            .then(res => {
                console.log("My deductions", res.data.data[0].deductions);
                setPurchase(res.data.data[0].voucher);

                setDeductions(res.data.data[0].deductions);
                setSales(res.data.data)
            });
        // viewItem();
        viewAdditionalFields();
        getVouchers();
    }, []);

    
    console.log("sales", sales)
    return (
        <div>
            <Card>

                <CardHeader>Purchase Voucher</CardHeader>

                <CardBody style={{ marginLeft: "150px" }}>
                    {sales.map((pur, index) => {
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
                                        {pur.salesVoucher[0].name}
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

                        {vouchers &&
                            <>
                                <tbody>
                                    {vouchers.map((pur, idx) => (
                                        <>
                                            <tr key={idx}>
                                                <td>
                                                    <Button onClick={() => setModalData(pur, pur.id)}>
                                                        <EditIcon />
                                                    </Button>
                                                </td>
                                                <th>
                                                    <input name='name' onChange={(e) => handleSalesChange(e, pur, idx)} value={pur.name}></input>
                                                </th>
                                                <th>
                                                    <input name='quantity' onChange={(e) => handleSalesChange(e, pur, idx)} value={pur.quantity}></input>
                                                </th>
                                                <th>
                                                    <input name='unit' onChange={(e) => handleSalesChange(e, pur, idx)} value={pur.unit}></input>
                                                </th>
                                                <th>
                                                    <input name='price' onChange={(e) => handleSalesChange(e, pur, idx)} value={pur.price}></input>
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
                                                        {console.log(voucher, ' voucher here')}
                                                        <FormGroup>
                                                            <Label for="qty">Billing Weight (Quantity in QTL)</Label>
                                                            <Input
                                                                type="number"
                                                                name="billingWeight"
                                                                placeholder="Enter Billing Weight"
                                                                value={voucher.billingWeight || 0}
                                                                onChange={(e) => handleQuantityChange(e, pur)}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label for="qty">Kanta Weight</Label>
                                                            <Input
                                                                type="number"
                                                                name="kantaWeight"
                                                                placeholder="Enter Kanta Weight"
                                                                value={voucher.kantaWeight || 0}
                                                                onChange={(e) => handleQuantityChange(e, pur)}

                                                            />
                                                        </FormGroup>

                                                        <FormGroup>
                                                            <Label for="qty">Accepted Weight</Label>
                                                            <br></br>
                                                            <Input type="number" value={voucher.acceptedWeight} disabled/>
                                                        </FormGroup>
                                                        <>


                                                            <FormGroup>
                                                                <Label for="bardanaClaim">Bardana Claim</Label>
                                                                <Input
                                                                    type="number"
                                                                    name="bardanaClaim"
                                                                    placeholder="Enter Bardana Claim"
                                                                    value={voucher.bardanaClaim}
                                                                    onChange={(e) => handleQuantityChange(e,pur)}

                                                                />


                                                            </FormGroup>

                                                            <FormGroup>
                                                                <Label for="qualityClaimPercent">Quality Claim %</Label>
                                                                <Input
                                                                    type="number"
                                                                    name="qualityClaimPercent"
                                                                    placeholder="Enter Quality Claim %"
                                                                    value={voucher.qualityClaimPercent}
                                                                    onChange={(e) => handleQuantityChange(e,pur)}
                                                                    pattern="^\d+(?:\.\d{1,2})?$"
                                                                />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="qualityClaimPercent">Quality Claim</Label>
                                                                <Input
                                                                    type="number"
                                                                    name="qualityClaim"
                                                                    placeholder="Enter Quality Claim %"
                                                                    value={voucher.qualityClaim}
                                                                    onChange={(e) => handleQuantityChange(e,pur)}

                                                                />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="qualityClaim">Rate Claim</Label>
                                                                <Input
                                                                    type="number"
                                                                    name="rateClaim"
                                                                    placeholder="Enter Quantity"
                                                                    value={voucher.rateClaim}
                                                                    onChange={(e) => handleQuantityChange(e, pur)}

                                                                />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="qualityClaim">Moisture</Label>
                                                                <Input
                                                                    type="number"
                                                                    name="moisture"
                                                                    placeholder="Enter Quantity"
                                                                    value={voucher.moisture}
                                                                    onChange={(e) => handleQuantityChange(e, pur)}

                                                                />
                                                            </FormGroup>

                                                        </>

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
                    <br />
                    <Row>
                        <Col md={7}>
                        </Col>
                        <Col md={5}>
                            <b>Total Amount : {getTotalAmount()}</b>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "20px" }}>
                        <Col md="8">
                        </Col>
                        <Col md="3">
                            <button style={{ marginRight: "20px" }} onClick={() => addNewPurchase(id)} className='btn btn-primary'>Add New</button>
                            <button onClick={() => savePurchase(id)} className='btn btn-primary'>Save</button>
                        </Col>
                        <Col md="1">
                        </Col>
                    </Row>

                </CardBody>
            </Card>
            <br />
            <br />
            <Card>
                <CardHeader>Optional Fields</CardHeader>

                <CardBody>
                    <Row>
                        <Col md={3}>

                        </Col>
                        <Col md={6}>
                            <Form>
                                <FormGroup>
                                    <Label for="vehicleNo">Vehicle No.</Label>
                                    <Input
                                        type="text"
                                        name="vehicleNo"
                                        placeholder="Enter Vehicle No."
                                        value={optionalFields.vehicleNo}
                                        onChange={(e) => handleChange(e)}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="brokerage">Drivers Name</Label>
                                    <Input
                                        type="text"
                                        name="driverName"
                                        placeholder="Enter Driver Name"
                                        value={optionalFields.driverName}
                                        onChange={handleChange}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="loadingIncharge">Loading Incharge</Label>
                                    <Input
                                        type="text"
                                        name="loadingIncharge"
                                        placeholder="Enter Loading Incharge"
                                        value={optionalFields.loadingIncharge}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="kantaSilipWeight">Kanta Silip Weight</Label>
                                    <Input
                                        type="text"
                                        name="kantaSilipWeight"
                                        placeholder="Enter Kanta Silip Weight"
                                        value={optionalFields.kantaSilipWeight}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dalalName">Dalal Name</Label>
                                    <Input
                                        type="text"
                                        name="dalalName"
                                        placeholder="Enter Dalal Name"
                                        value={optionalFields.dalalName}
                                        onChange={handleChange}
                                    />
                                </FormGroup>

                                <FormGroup check row>
                                    <Col sm={{ size: 10, offset: 2 }}>
                                        <Button onClick={addOptionalFields}>Submit</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col md={3}>

                        </Col>
                    </Row>


                </CardBody>
            </Card>
            <br/>
            <br/>
            <Card>
                <CardBody>
                    <Row>
                        <br />
                        <Card>
                            <CardBody>

                                <table style={{ marginLeft: "135px", border: "1px solid black" }}>
                                    <thead>
                                        <tr>
                                            <th>S No.</th>
                                            <th>Bill Sundry</th>
                                            <th>@</th>
                                            <th>Amount(Rs.)</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;1.
                                            </td>
                                            <td>Freight (add)</td>
                                            <td>
                                                <input type="number" onChange={(e) => setFrieghtAdd(e.target.value)} value={freightAdd} />

                                            </td>
                                            <td>
                                                <input type="number" value={Number(deductions.freight) + Number(freightAdd) - Number(freightSub)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;2.

                                            </td>
                                            <td>Freight (less)</td>
                                            <td>
                                                <input type="number" onChange={(e) => setFrieghtSub(e.target.value)} value={freightSub} />

                                            </td>
                                            <td>

                                                <input type="number" value={Number(deductions.freight) + Number(freightAdd) - Number(freightSub)} />

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;3.
                                            </td>
                                            <td>Dala (Labour Charge)</td>
                                            <td></td>
                                            <td>
                                                <input name="dala" type="number" onChange={handleDeductionChange} value={deductions.dala} />

                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;4.
                                            </td>
                                            <td>Kanta Charge</td>
                                            <td></td>
                                            <td>
                                                <input name="kanta" type="number" onChange={(e) => handleDeductionChange(e)} value={deductions.kanta} />


                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;5.
                                            </td>
                                            <td>CD (Cash Discount)</td>
                                            <td></td>
                                            <td>
                                                <input name="cd" type="number" onChange={handleDeductionChange} value={deductions.cd} />


                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;6.
                                            </td>
                                            <td>TDS / TCS</td>
                                            <td></td>
                                            <td>
                                                <input name="tds" type="number" onChange={handleDeductionChange} value={deductions.tds} />

                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;7.

                                            </td>
                                            <td>Bardana Chowker Qty / Amount</td>
                                            <td></td>
                                            <td>
                                                <input name="bardana" type="number" onChange={handleDeductionChange} value={deductions.bardana} />

                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;8.
                                            </td>
                                            <td>Brokerage</td>
                                            <td></td>
                                            <td>
                                                <input name="brokerage" type="number" onChange={handleDeductionChange} value={deductions.brokerage} />

                                            </td>
                                        </tr>



                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;9.

                                            </td>
                                            <td>Commission (add)</td>
                                            <td>
                                                <input type="number" onChange={(e) => setCommAdd(e.target.value)} value={commAdd} />

                                            </td>
                                            <td>
                                                <input type="number" value={Number(deductions.commission) + Number(commAdd) - Number(commSub)} />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;10.
                                            </td>
                                            <td>Commission (less)</td>
                                            <td>
                                                <input type="number" onChange={(e) => setCommSub(e.target.value)} value={commSub} />

                                            </td>
                                            <td>
                                                <input type="number" value={Number(deductions.commission) + Number(commAdd) - Number(commSub)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                        <br/>
                                        <b>Total Amount : {getTotalFreightDeductions()}</b>
                                            </td>
                                        </tr>

                                    </tbody>
                                    <br/>
                                    
                                </table>
                               
                                <Row style={{ marginTop: "20px" }}>
                                    <Col md="8">
                                    </Col>
                                    <Col md="3">
                                        {/* <button style={{marginRight: "20px"}} onClick={()=>addNewPurchase()} className='btn btn-primary'>Add New</button> */}
                                        <button onClick={() => saveDeductions(deductions.id)} className='btn btn-primary'>Save</button>
                                    </Col>
                                    <Col md="1">
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col md={8}>

                                    </Col>
                                    <Col md={4}>
                                    <b>Net Amount : {getTotalAmount() - getTotalFreightDeductions()}</b>
                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                    </Row>
                    <br />
                    <Row>
                        <Col md={6}>
                        </Col>
                        <Col md={6}>
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
