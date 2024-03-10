import { Box, styled } from "@mui/material";
import { Fragment, useState ,useEffect } from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { useAuth } from "functions/contextproject";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Loader from "components/admin/common/Loader";
import Link from "next/link";

// styled components
const BodyWrapper = styled(Box)(({
  theme,
  compact
}) => ({
  transition: "margin-left 0.3s",
  marginLeft: compact ? "86px" : "280px",
  [theme.breakpoints.down("lg")]: {
    marginLeft: 0
  }
}));
const InnerWrapper = styled(Box)(({
  theme
}) => ({
  transition: "all 0.3s",
  [theme.breakpoints.up("lg")]: {
    maxWidth: 1200,
    margin: "auto"
  },
  [theme.breakpoints.down(1550)]: {
    paddingLeft: "2rem",
    paddingRight: "2rem"
  }
}));

// ======================================================

// ======================================================

const VendorDashboardLayout = ({
  children
}) => {
  const [sidebarCompact, setSidebarCompact] = useState(0);
  const [showMobileSideBar, setShowMobileSideBar] = useState(0);

  const { logout, profile, setPageLoading, pageLoading, user } = useAuth();
  const {  replace } = useRouter();



  useEffect(() => {
    console.log("profile Role: " + profile?.name);

    if (profile?.role && profile?.role !== "admin") {
      replace("/");
      toast.error("sorry you are not allowed to edit this page");
    }

 
  }, [profile]);




  if (pageLoading) {
    <div className=" h-[100vh] flex justify-center items-center">
      <div>
        <h1>Please Login First to Access to this page</h1>
        <h2 className=" text-blue-400 text-center text-2xl font-semibold">
          <Link href={"/auth/login"}> Login Page</Link>
        </h2>
        <h2 className=" text-blue-400 text-4xl font-bold text-center mt-12">
          {/* <Spinner size={"xl"} fontSize={"50px"} /> */}
          ....Loading
        </h2>
      </div>
    </div>;
  }

  if (profile && profile?.role !== "admin") {
    return (
      <div className="bg-blue-200 !h-screen w-full fixed top-0 flex justify-center items-center z-50">
        <h1 className="font-cutiveMono text-3xl">
          Sorry You Are Not Admin {profile?.role}
        </h1>
      </div>
    );
  }

  if (profile === null) {
    return (
      <>
        <Loader />
      </>
    );
  }




  // handle sidebar toggle for desktop device
  const handleCompactToggle = () => setSidebarCompact(state => state ? 0 : 1);
  // handle sidebar toggle in mobile device
  const handleMobileDrawerToggle = () => setShowMobileSideBar(state => state ? 0 : 1);
  return <Fragment>
   
      <DashboardSidebar sidebarCompact={sidebarCompact} showMobileSideBar={showMobileSideBar} setSidebarCompact={handleCompactToggle} setShowMobileSideBar={handleMobileDrawerToggle} />

      <BodyWrapper compact={sidebarCompact ? 1 : 0}>
        <DashboardNavbar handleDrawerToggle={handleMobileDrawerToggle} />
        <InnerWrapper>{children}</InnerWrapper>
      </BodyWrapper>
    </Fragment>;
};
export default VendorDashboardLayout;