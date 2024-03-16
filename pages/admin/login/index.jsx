import SEO from "components/SEO";
import Login from "../../../src/components/admin/LoginAdminMain";
import { FlexRowCenter } from "components/flex-box";
import MainLayout from "../../../src/components/ProjectComponents/mainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
const LoginAdmin = () => {
  return (
    <MainLayout>
      <FlexRowCenter flexDirection="column" minHeight="100vh">
        <SEO title="Login" />
        <Login />
      </FlexRowCenter>
      ;
    </MainLayout>
  );
};

export const getStaticProps = async ({ locale }) => {
  //const allProducts = await api.getAllProducts();
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // allProducts,
    },
  };
};

export default LoginAdmin;
