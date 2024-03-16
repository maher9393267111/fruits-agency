import SEO from "components/SEO";
import Login from "../../../src/components/admin/LoginAdminMain";
import { FlexRowCenter } from "components/flex-box";
import MainLayout from '../../../src/components/ProjectComponents/mainLayout'



const LoginAdmin = () => {


  return <MainLayout>


  
  <FlexRowCenter flexDirection="column" minHeight="100vh">
      <SEO title="Login" />
      <Login />
    </FlexRowCenter>;
    </MainLayout>
};
export default LoginAdmin;