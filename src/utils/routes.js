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
        path: "/sales/:id",
        component: React.lazy(() => import('pages/sales/SalesDetails')),
        roles: ['Super Admin', 'Broker']
    },
    {
        path: "/sales",
        component: React.lazy(() => import('pages/sales/SalesPage')),
        roles: ['Super Admin', 'Broker']
    },
    {
        path: "/salesOrder",
        component: React.lazy(() => import('pages/sales/SalesPlaceOrderForm')),
        roles: ['Super Admin', 'Broker']
    },
    {
        path: "/salesDetails/:id",
        component: React.lazy(() => import('pages/sales/SalesDetails')),
        roles: ['Super Admin', 'Broker']
    },
    {
        path: '/orders',
        component: React.lazy(() => import('pages/orders/OrderSuperAdminPage')),
        roles: ['Super Admin', 'Broker']
    },

];

export default routes;