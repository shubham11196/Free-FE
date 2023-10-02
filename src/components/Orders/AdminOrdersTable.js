import React from 'react';
import { Table, Progress } from 'reactstrap';
import Avatar from 'components/Avatar';
import withBadge from 'hocs/withBadge';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button
} from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AdminOrdersTable = ({ headers, usersData, ...restProps }) => {
  const handleApprove = async(id) => {
    const res = await axios.post(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/approveOrder/${id}`);
    toast("Order Approved Successfully"); 
  }

  const handleDisapprove = async (id) => {
    const res = await axios.post(`${'https://admin-backend-fjzy.onrender.com'}/api/orders/disapproveOrder/${id}`);
    toast("Order Rejected Successfully");
  }
  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {usersData.map((usersData, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td className="align-middle text-center">dwdw{usersData.date}</td>
            <td className="align-middle text-center">{usersData.productName}</td>
            <td className="align-middle text-center">{usersData.quantity}</td>
            <td className="align-middle text-center">{usersData.rate}</td>
            <td className="align-middle text-center">{usersData.bardanas}</td>
            <td className="align-middle text-center">{usersData.brokerage}</td>
            <td className="align-middle text-center">{usersData.deliveryTime}</td>
            <td className="align-middle text-center">{usersData.firmName}</td>
            <td className="align-middle text-center">{usersData.approvalStatus ? <span style={{color:"green", fontWeight: "600"}}>Approved</span> : <span style={{color:"red", fontWeight: "600"}}>Rejected</span>}</td>
            <td className="align-middle text-center">
              
              <div>{!usersData.approvalStatus ?
                <Button color="primary" size="sm" onClick={()=>handleApprove(usersData.id)}>
                  Approve
                </Button> :
                <Button style={{ marginLeft: "10px" }} onClick={()=>handleDisapprove(usersData.id)} color="secondary" size="sm">
                  Reject
                </Button>
              }
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <ToastContainer />

    </Table>
  );
};





export default AdminOrdersTable;