import React from 'react';
import { Table, Button } from 'reactstrap';
// import Avatar from 'components/Avatar';
// import withBadge from 'hocs/withBadge';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';


const OrdersTable = ({ headers, usersData, ...restProps }) => {
  const history = useHistory();

  const handleApprove = async (id) => {
    await axios.post(`${'http://localhost:5000'}/api/orders/approveOrder/${id}`);
    toast("Order Approved Successfully");
  }
  const role = localStorage.getItem("role")

  const handleDisapprove = async (id) => {
    await axios.post(`${'http://localhost:5000'}/api/orders/disapproveOrder/${id}`);
    toast("Order Rejected Successfully");
  }

  const handleAccept = async (id) => {
    localStorage.setItem("purchaseId", id)
    history.push(`/purchase/${id}`)
  }


  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {usersData.length > 0 && usersData.map((usersData, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td className="align-middle text-center">{usersData.date}</td>
            <td className="align-middle text-center">{usersData.productName}</td>
            <td className="align-middle text-center">{usersData.quantity}</td>
            <td className="align-middle text-center">{usersData.rate}</td>
            <td className="align-middle text-center">{usersData.bardanas}</td>
            <td className="align-middle text-center">{usersData.brokerage}</td>
            <td className="align-middle text-center">{usersData.deliveryTime}</td>
            <td className="align-middle text-center">{usersData.firmName}</td>
            <td className="align-middle text-center">
              {usersData.approvalStatus === "Pending" ? <div style={{color: "blue", weight: "700"}}>Pending</div>:""}
              {usersData.approvalStatus === "Disapprove" ? <div style={{color: "red", weight: "700"}}>Disaproved</div>: ""}
              {usersData.approvalStatus === "Approved" ? <div style={{color: "green", weight: "700"}}>Approved</div>: ""}

            </td>
            <td className="align-middle text-center">
              {role === "Super Admin" ?
                <div>
                {usersData.approvalStatus === "Pending" ?
                  <Button color="primary" size="sm" onClick={() => handleApprove(usersData.id)}>
                    Approve
                  </Button> :
                  ""
                }
                {usersData.approvalStatus === "Disapprove" ?
                  <Button color="primary" size="sm" onClick={() => handleApprove(usersData.id)}>
                    Approve
                  </Button> :
                  ""
                }
                {usersData.approvalStatus === "Approved" ?
                  <Button color="primary" size="sm" onClick={() => handleDisapprove(usersData.id)}>
                    Disapprove
                  </Button> :
                  ""
                }

                </div> :
                <>
                  <EditIcon style={{ marginRight: "10px" }} /><RemoveRedEyeIcon />
                </>
              }

            </td>
            <td>
              {role === "Super Admin" ?
                <>
                  <Button style={{ marginBottom: "10px" }} color="primary" size="sm" onClick={() => handleAccept(usersData.id)}>
                    Accept
                  </Button>
                  <Button style={{ marginLeft: "10px" }} onClick={() => handleDisapprove(usersData.id)} color="secondary" size="sm">
                    Reject
                  </Button>
                </>
                : null
            
            }

            </td>
          </tr>
        ))}
      </tbody>
      <ToastContainer />

    </Table>
  );
};





export default OrdersTable;