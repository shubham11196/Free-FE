import React from 'react';

import { Table } from 'reactstrap';

// import Avatar from 'components/Avatar';

// import withBadge from 'hocs/withBadge';

// const AvatarWithBadge = withBadge({
//   position: 'bottom-right',
//   color: 'success',
// })(Avatar);

const OrdersTable = ({ headers, usersData, ...restProps }) => {
  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {usersData.map(({ orderType, productName, date }, index) => (
          <tr key={index}>
            <td className="align-middle text-center">{orderType}</td>
            <td className="align-middle text-center">{productName}</td>
            <td className="align-middle text-center">{new Date(date).toDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};





export default OrdersTable;
