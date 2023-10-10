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
import { Label } from 'reactstrap';
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
      axios.post(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/createVoucher/${id}`,purchase).then(res=>console.log(res));
      toast("Voucher data added Successfully");

    }

    const saveDeductions = async () =>{
      let body = {...deductions, 
        freight: Number(deductions.freight) + Number(freightAdd) - Number(freightSub),
        commission: Number(deductions.commission) + Number(commAdd) - Number(commSub)
      }
      await axios.post(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/addDeductions/${id}`,body).then(res=>console.log(res));
      toast("Deductions added Successfully");
    }

    console.log("Purchase", purchase.length)
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

                        {purchase.lenth>0 ?
                            <tbody>
                            {purchase.map((pur, idx) => (
                                <tr>
                                    <th>
                                        <input/>
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
                        </tbody> :
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
                        }
                    </table>
                    
              </CardBody>
            </Card>
            
            <br/>
            <Row>
            <Col md={6}>

            
          </Col>
          <Col md={6}>

            

          </Col>
        </Row>
        <ToastContainer />
        </div>
    )
}
