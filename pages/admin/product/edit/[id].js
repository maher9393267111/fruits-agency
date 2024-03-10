import React ,{useState ,useEffect} from 'react';
import UpdateProduct from '../../../../src/components/admin/product/updateProduct';
import { getDocuments,getDocument } from '../../../../src/functions/firebase/getData';
import Loader from '../../../../src/components/admin/common/Loader';


const EditSubPage = ({id}) => {

    //const product = await getDocument("products", context.query.id);

    const [product ,setProduct] = useState({})
const [loacding, setLoading] = useState(true)

// const Products = await getDocuments("products")



useEffect(() => {
  const getProducts = async () => {

    setLoading(true)
      setProduct({})
      const data   = await getDocument("products",id);
      console.log(data,"fetch categories ====>>>>")
      setProduct(data)
      setLoading(false)
    }

    if(id) getProducts();
}, []);


    return (
        <div>

{loacding ? 
<Loader/>
:
    
<UpdateProduct
product={product}

/>

}



        </div>
    );
}


export default EditSubPage;



// serverside to fetch single catgory in serverside from firestore




EditSubPage.getInitialProps = async (context) => {
 
    const id =context.query.id


    // context.query.id ==> admin/category/edit/${context.query.id} in browser
      //  const product = await getDocument("products", context.query.id);
       
     
    
    
     
        return {
            id:id
           // product: product,
          
        };
      };