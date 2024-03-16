import SEO from "components/SEO";
import ContactForm from "components/ProjectComponents/ContactForm";
import MainLayout from "components/ProjectComponents/mainLayout";
import { FlexRowCenter } from "components/flex-box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const ContactPage = () => {
  return (
    <MainLayout>
      <div className=" mt-20 mb-20">
        <FlexRowCenter flexDirection="column" minHeight="80vh">
          <SEO title="Contact" />
          <ContactForm />
        </FlexRowCenter>
      </div>
    </MainLayout>
  );
};
export default ContactPage;

export const getStaticProps = async ({ locale }) => {
  //const allProducts = await api.getAllProducts();
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // allProducts,
    },
  };
};
