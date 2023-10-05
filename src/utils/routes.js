import React from "react";

const routes = [
    {
        path: '/',
        component: React.lazy(() => import('pages/DashboardPage')),
        roles: ['admin', 'user']
    },
    {
        path: "/purchase/:id",
        component: React.lazy(() => import('pages/orders/PurchaseOrderPage')),
        roles: ['Super Admin', 'Broker']
    },
    {
        path: '/orders',
        component: React.lazy(() => import('pages/orders/OrderSuperAdminPage')),
        roles: ['Super Admin', 'Broker']
    },

];

export default routes;