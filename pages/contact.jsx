import SEO from "components/SEO";
import ContactForm from "components/ProjectComponents/ContactForm";
import MainLayout from "components/ProjectComponents/mainLayout";
import { FlexRowCenter } from "components/flex-box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const ContactPage = () => {
  return (
    <div className="w-fit">
    <MainLayout >
      <div className=" my-20 !min-w-full ">
        <FlexRowCenter flexDirection="column" minHeight="80vh" >
          <SEO title="Contact" />
          <ContactForm />
        </FlexRowCenter>
      </div>
    </MainLayout>
    </div>
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
