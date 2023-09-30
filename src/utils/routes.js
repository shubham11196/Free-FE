import React from "react";

const routes = [
    {
        path: '/',
        component: React.lazy(() => import('pages/DashboardPage')),
        roles: ['admin', 'user']
    },
    // {
    //     path: '/orders',
    //     component: React.lazy(() => import('pages/orders/OrdersBrokerPage')),
    //     roles: ['admin', 'Broker']
    // },
    // {
    //     path: "/purchase/:id",
    //     component: React.lazy(() => import('pages/orders/PurchaseOrderPage')),
    //     roles: ['Super Admin', 'Broker']
    // }

];

export default routes;