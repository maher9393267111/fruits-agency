import React from 'react';
import AdminLayout from '../AdminLayout';
import ProductTable from './productTable';
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
const ProductsMain = ({products}) => {
    return (
       
        <VendorDashboardLayout>


<ProductTable products={products}/>

</VendorDashboardLayout>

     
    );
}


export default ProductsMain;
