import React from 'react';
import { Table } from 'reactstrap';
// import Avatar from 'components/Avatar';
// import withBadge from 'hocs/withBadge';
// import EditIcon from '@mui/icons-material/Edit';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import axios from 'axios';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const PurchaseDetailsTable = ({ headers, usersData, ...restProps }) => {
  
  // const role = localStorage.getItem("role")

  
  
  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        
      </tbody>
      <ToastContainer />

    </Table>
  );
};





export default PurchaseDetailsTable;