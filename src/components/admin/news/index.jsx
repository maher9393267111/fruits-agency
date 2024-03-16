import React from 'react';
import AdminLayout from '../AdminLayout';
import ProductTable from './newsTable';
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
const NewsMain = ({products ,news}) => {
    return (
       
        <VendorDashboardLayout>


<ProductTable products={products} news={news}/>

</VendorDashboardLayout> 

     
    );
}


export default NewsMain;
