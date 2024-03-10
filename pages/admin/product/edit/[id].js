import React from 'react';
import UpdateProduct from '../../../../src/components/admin/product/updateProduct';
import { getDocuments,getDocument } from '../../../../src/functions/firebase/getData';
const EditSubPage = ({product,cats,subcats}) => {
    return (
        <div>
            <UpdateProduct
            product={product}
            cats={cats}
            subcats={subcats}
            />
        </div>
    );
}


export default EditSubPage;



// serverside to fetch single catgory in serverside from firestore




EditSubPage.getInitialProps = async (context) => {
 
    // context.query.id ==> admin/category/edit/${context.query.id} in browser
        const product = await getDocument("products", context.query.id);
        const cats = await getDocuments("cats");
        const subcats = await getDocuments("subcats");
     
       
        console.log('single category --<>' , product,cats,subcats)
    
    
     
        return {
            product: product,
            cats: cats,
            subcats: subcats,
        };
      };