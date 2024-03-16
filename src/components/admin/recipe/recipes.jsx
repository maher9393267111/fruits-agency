import React from 'react';
import AdminLayout from '../AdminLayout';
import ProductTable from './recipeTable';
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
const RecipesMain = ({products}) => {
    return (
       
        <VendorDashboardLayout>


<ProductTable products={products}/>

</VendorDashboardLayout>

     
    );
}


export default RecipesMain;
