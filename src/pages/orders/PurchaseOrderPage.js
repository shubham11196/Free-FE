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
    Form
} from 'reactstrap';
// import Page from '../../components/Page';
import { Label } from 'reactstrap';
// import PurchaseDetailsTable from '../../components/Orders/PurchaseDetailsTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PurchaseOrderPage() {
    const [order, setOrder] = useState([]);
    const [purchase, setPurchase] = useState([]);
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
      kantaWeight: 0
    });

    const [ freightAdd, setFrieghtAdd] = useState(0);
    const [ freightSub, setFrieghtSub] = useState(0);
    const [ commAdd, setCommAdd] = useState(0);
    const [ commSub, setCommSub] = useState(0);

    // const calculateFreight = (e) => {
    //   const { name, value } = e.target;
    //   // if(name === "freightAdd")
         
    // }

  

    // const calculateComm = ()  => {

    // }

    
    
    const handleQuantityChange = (e) => {
      const { name, value } = e.target;
      let minQty = addFields.qty
      if(name === "billingWeight"){
        let newValue = value ? value : 0;
        minQty = Math.min(Number(newValue), Number(quantityData.kantaWeight))

      }
      if(name === "kantaWeight"){
        let newValue = value ? value : 0;
        minQty = Math.min(Number(quantityData.billingWeight), Number(newValue))

      }
      setAddFields(() => {
          return {
              ...addFields,
              qty: minQty

          }
      })
      console.log("Minimum", quantityData);
      console.log("Minimum", Math.min(quantityData.billingWeight, quantityData.kantaWeight))
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
                console.log("responseesssss", res.data.data)
            });
        viewItem();
        viewAdditionalFields();
        
    }, []);
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
        console.log("my response", res);
    }
    const viewItem = async () => {
        const res = await axios.get(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/viewItems/${id}`, 
        addFields
        );
        setAddFields(res.data.data[0])
        console.log("my response", res);
    }
    const handlePurchaseChange = (e, product, i) =>{
      e.preventDefault();
      let oldPurchases = [...purchase];
      product[e.target.name] = e.target.value;
      oldPurchases[i] = product;
      setPurchase(oldPurchases);
    }

    const addNewPurchase = () => {
      let newPurchase = {
        productName: '',
        quantity: 0,
        unit:0,
        price:0
      };
      setPurchase(oldState => [...oldState, newPurchase]);
    }



    const savePurchase = (id) =>{
      console.log(purchase,'purchase data');
      axios.post(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/createVoucher/${id}`,purchase).then(res=>console.log(res));
      toast("Voucher data added Successfully");

    }

    const saveDeductions = async () =>{
      console.log(deductions,'deduction data');
      let body = {...deductions, 
        freight: Number(deductions.freight) + Number(freightAdd) - Number(freightSub),
        commission: Number(deductions.commission) + Number(commAdd) - Number(commSub)
      }
      console.log("my body", body)
      const response = await axios.post(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/addDeductions/${id}`,body).then(res=>console.log(res));
      console.log(response, "my res");
      toast("Deductions added Successfully");

    }
    console.log("My fields",optionalFields);
    return (
        <div>
            <Card>

                <CardHeader>Purchase Voucher</CardHeader>

                <CardBody style={{marginLeft:"150px"}}>
                    {order.map((pur, index) => {
                    const today = new Date(pur.date);
                    const month = today.getMonth()+1;
                    const year = today.getFullYear();
                    const date = today.getDate();
                    const currentDate = month + "/" + date + "/" + year;
                    return(
                       <div class="container">
                       <div class="row">
                           <div class="col-sm-4">
                           <Label style={{fontWeight: "600"}}>Series : </Label>
                           &nbsp; &nbsp; 
                               {pur.productName}
                           </div>
                           <div class="col-sm-4">
                           <Label style={{fontWeight: "600"}}>Date : </Label>
                           &nbsp; &nbsp; 
                               {currentDate}
                               
                           </div>
                           <div class="col-sm-4">
                           <Label style={{fontWeight: "600"}}>Vch No : </Label>
                           &nbsp; &nbsp; 
                               {pur.voucherId}
                           </div>
                          

                       </div>

                       <div class="row">
                           <div class="col-sm-4">
                           <Label style={{fontWeight: "600"}}>Party : </Label>
                           &nbsp; &nbsp; 
                               Ashok Bansal Ji Gajraula
                           </div>
                           <div class="col-sm-4">
                           <Label style={{fontWeight: "600"}}>Narration : </Label>
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
            <br/>
            <Card>
                <CardBody>
                  
                    <table style={{marginLeft:"135px"}}>
                        <thead>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Price(Rs.)</th>
                            <th>Amount(Rs.)</th>

                        </thead>
                        <tbody>
                            {purchase.map((pur, idx) => (
                                <tr>
                                    <th>
                                        <input name='productName' onChange={(e)=> handlePurchaseChange(e, pur, idx)} value={pur.productName}></input>
                                    </th>
                                    <th>
                                        <input name='quantity' onChange={(e)=> handlePurchaseChange(e, pur, idx)} value={pur.quantity}></input>
                                    </th>
                                    <th>
                                        <input name='unit' onChange={(e)=> handlePurchaseChange(e, pur, idx)} value={pur.unit}></input>
                                    </th>
                                    <th>
                                        <input name='price' onChange={(e)=> handlePurchaseChange(e, pur, idx)} value={pur.price}></input>
                                    </th>
                                    <th>
                                        <input value={pur.price * pur.quantity}></input>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Row style={{marginTop: "20px"}}>
                        <Col md="8">                        
                        </Col>
                        <Col md="3">  
                            <button style={{marginRight: "20px"}} onClick={()=>addNewPurchase()} className='btn btn-primary'>Add New</button>
                            <button onClick={()=>savePurchase()} className='btn btn-primary'>Save</button>
                        </Col>
                        <Col md="1">  
                        </Col>
                    </Row>
              </CardBody>
            </Card>
            <br/>
            <Card>
                <CardBody>
                  
                    <table style={{marginLeft:"135px", border: "1px solid black"}}>
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
                              <input type="number" onChange={(e) => setFrieghtAdd(e.target.value)} value={freightAdd}/>

                              </td>
                              <td>
                              <input type="number" value={Number(deductions.freight) + Number(freightAdd) - Number(freightSub)}/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                              &nbsp;&nbsp;&nbsp;2.

                              </td>
                              <td>Freight (less)</td>
                              <td>
                              <input type="number" onChange={(e) => setFrieghtSub(e.target.value)} value={freightSub}/>

                              </td>
                              <td>
                              <input type="number" value={Number(deductions.freight) + Number(freightAdd) - Number(freightSub)}/>

                              </td>
                            </tr>
                            <tr>
                              <td>
                              &nbsp;&nbsp;&nbsp;3.
                              </td>
                              <td>Dala (Labour Charge)</td>
                              <td></td>
                              <td>
                              <input name="dala" type="number" onChange={handleDeductionChange} value={deductions.dala}/>

                              </td>
                            </tr>

                            <tr>
                              <td>
                              &nbsp;&nbsp;&nbsp;4.
                              </td>
                              <td>Kanta Charge</td>
                              <td></td>
                              <td>
                              <input name="kanta" type="number" onChange={(e) => handleDeductionChange(e)} value={deductions.kanta}/>


                              </td>
                            </tr>

                            <tr>
                              <td>
                              &nbsp;&nbsp;&nbsp;5.
                              </td>
                              <td>CD (Cash Discount)</td>
                              <td></td>
                              <td>
                              <input name="cd" type="number" onChange={handleDeductionChange} value={deductions.cd}/>


                              </td>
                            </tr>

                            <tr>
                              <td>
                              &nbsp;&nbsp;&nbsp;6.
                              </td>
                              <td>TDS / TCS</td>
                              <td></td>
                              <td>
                              <input name="tds" type="number" onChange={handleDeductionChange} value={deductions.tds}/>

                              </td>
                            </tr>

                            <tr>
                              <td>
                              &nbsp;&nbsp;&nbsp;7.

                              </td>
                              <td>Bardana Chowker Qty / Amount</td>
                              <td></td>
                              <td>
                              <input name="bardana" type="number" onChange={handleDeductionChange} value={deductions.bardana}/>

                              </td>
                            </tr>

                            <tr>
                              <td>
                              &nbsp;&nbsp;&nbsp;8.
                              </td>
                              <td>Brokerage</td>
                              <td></td>
                              <td>
                              <input name="brokerage" type="number" onChange={handleDeductionChange} value={deductions.brokerage}/>

                              </td>
                            </tr>

                         

                            <tr>
                              <td>
                              &nbsp;&nbsp;&nbsp;9.

                              </td>
                              <td>Commission (add)</td>
                              <td>
                              <input type="number" onChange={(e) => setCommAdd(e.target.value)} value={commAdd}/>

                              </td>
                              <td>
                              <input type="number" value={Number(deductions.commission) + Number(commAdd) - Number(commSub)}/>
                              </td>
                            </tr>

                            <tr>
                              <td>
                              &nbsp;&nbsp;&nbsp;10.
                              </td>
                              <td>Commission (less)</td>
                              <td>
                              <input type="number" onChange={(e) => setCommSub(e.target.value)} value={commSub}/>

                              </td>
                              <td>
                              <input type="number" value={Number(deductions.commission) + Number(commAdd) - Number(commSub)}/>
                              </td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <Row style={{marginTop: "20px"}}>
                        <Col md="8">                        
                        </Col>
                        <Col md="3">  
                            {/* <button style={{marginRight: "20px"}} onClick={()=>addNewPurchase()} className='btn btn-primary'>Add New</button> */}
                            <button onClick={()=>saveDeductions(deductions.id)} className='btn btn-primary'>Save</button>
                        </Col>
                        <Col md="1">  
                        </Col>
                    </Row>
              </CardBody>
            </Card>
          <Row>
            <Col md={6}>

            <Card style={{marginLeft:"40px"}}>
             <CardHeader>Optional Fields</CardHeader>

              <CardBody>
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
              
            </CardBody>
          </Card>
           

          </Col>
          <Col md={6}>

            <Card style={{marginRight:"40px"}}>
             <CardHeader>Item Add Field / Description</CardHeader>

              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="qty">Billing Weight (Quantity in QTL)</Label>
                    <Input
                      type="number"
                      name="billingWeight"
                      placeholder="Enter Billing Weight"
                      value={quantityData.billingWeight}
                      onChange={(e) => handleQuantityChange(e)}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="qty">Kanta Weight</Label>
                    <Input
                      type="number"
                      name="kantaWeight"
                      placeholder="Enter Kanta Weight"
                      value={quantityData.kantaWeight}
                      onChange={(e) => handleQuantityChange(e)}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="qty">Accepted Weight</Label>
                    <Input
                      type="text"
                      name="qty"
                      placeholder="Enter Billing Weight"
                      value={addFields.qty}
                      onChange={handleItemChange}

                    />
                  </FormGroup>
                   <FormGroup>
                    <Label for="bardanaClaim">Bardana Claim</Label>
                    <Input
                      type="text"
                      name="bardanaClaim"
                      placeholder="Enter Bardana Claim"
                      value={addFields.bardanaClaim}
                      onChange={handleItemChange}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="qualityClaimPercent">Quality Claim %</Label>
                    <Input
                      type="number"
                      name="qualityClaimPercent"
                      placeholder="Enter Quality Claim %"
                      value={addFields.qualityClaimPercent}
                      onChange={handleItemChange}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="qualityClaim">Quality Claim</Label>
                    <Input
                      type="number"
                      name="qualityClaim"
                      placeholder="Enter Quantity"
                      value={addFields.qualityClaim}
                      onChange={handleItemChange}

                    />
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button onClick={addItem}>Submit</Button>
                    </Col>
                  </FormGroup>
                </Form>
              
            </CardBody>
          </Card>
           

          </Col>
        </Row>
        <ToastContainer />
        </div>
    )
}
