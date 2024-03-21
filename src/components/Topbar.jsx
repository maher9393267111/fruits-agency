import Link from "next/link";
import { useState } from "react";
import { Add, ExpandMore, Facebook, Instagram, Remove, Twitter } from "@mui/icons-material";
import { Box, Chip, Container, IconButton, MenuItem, styled } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import BazaarMenu from "components/BazaarMenu";
import { layoutConstant } from "utils/constants";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useSettings from "hooks/useSettings";
import { TbWorld } from "react-icons/tb";
import { FaTiktok } from "react-icons/fa6";

// styled component
const TopbarWrapper = styled(Box, {
  shouldForwardProp: props => props !== "bgColor"
})(({
  theme,
  bgColor,
  expand
}) => ({
  fontSize: 12,
  height: layoutConstant.topbarHeight,
  color: theme.palette.secondary.contrastText,
  background: bgColor || theme.palette.grey[900],
  transition: "height 300ms ease",
  "& .menuItem": {
    minWidth: 100
  },
  "& .marginRight": {
    marginRight: "1.25rem"
  },
  "& .expand": {
    display: "none",
    padding: 0
  },
  "& .handler": {
    height: layoutConstant.topbarHeight
  },
  "& .menuTitle": {
    fontSize: 12,
    marginLeft: "0.5rem",
    fontWeight: 600
  },
  [theme.breakpoints.down("sm")]: {
    height: expand ? 80 : layoutConstant.topbarHeight,
    "& .topbarRight": {
      display: expand ? "flex" : "none",
      paddingBottom: 5
    },
    "& .expand": {
      display: "block",
      height: layoutConstant.topbarHeight
    },
    "& .MuiSvgIcon-root": {
      color: "white"
    }
  }
}));
const StyledContainer = styled(Container)(({
  theme
}) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    alignItems: "start",
    flexDirection: "column"
  }
}));

// ===========================================

// ===========================================

const Topbar = ({
  bgColor
}) => {
  const router = useRouter();
  const {
    t
  } = useTranslation("common");





  const {
    pathname,
    asPath,
    query
  } = router;
  const [expand, setExpand] = useState(false);
  const [language, setLanguage] = useState(router.locale);
  const {settings ,updateSettings } = useSettings();  
  const handleLanguageClick = lang => () => {
    setLanguage(lang);

    if(lang === 'ar'){
      updateSettings({direction: "rtl"  }) 
    }


    else {
      updateSettings({direction: "ltr"  }) 
    }




    router.push({
      pathname,
      query
    }, asPath, {
      locale: lang
    });
  };
  return <TopbarWrapper bgColor={bgColor} expand={expand ? 1 : 0}>
      <StyledContainer>
        {/* <FlexBetween width="100%">
          <FlexBox alignItems="center" gap={1}>
            <TbWorld className="w-5 h-5" label="WORLD" size="small" sx={{
            color: "white",
              
          }} />
            <Span className="title">{language === "en" ? "EN" : language === 'ar' ? 'Ar' : language === 'tr' && "TR"}</Span>
          </FlexBox>

          <IconButton disableRipple className="expand" onClick={() => setExpand(state => !state)}>
            {expand ? <Remove /> : <Add />}
          </IconButton>
        </FlexBetween> */}

        <FlexBox className="topbarRight" alignItems="center">
          <BazaarMenu handler={<TouchRipple className="handler marginRight">
          <TbWorld className="w-5 h-5" label="WORLD" size="small" sx={{
            color: "white",
          }} />
                <Span className="menuTitle">
                  {language === "en" ? "EN" : language === 'ar' ? 'Ar' : language === 'tr' && "TR"}
                </Span>
                <ExpandMore fontSize="inherit" />
              </TouchRipple>}>
            {languageList.map(item => <MenuItem key={item.title} className="menuItem" onClick={handleLanguageClick(item.value)}>
                <Span className="menuTitle">{item.title}</Span>
              </MenuItem>)}
          </BazaarMenu>

          <FlexBox alignItems="center" gap={1.5}>
            {socialLinks.map(({
            id,
            Icon,
            url
          }) => <Link href={url} key={id}>
                <a style={{
              lineHeight: 0
            }}>
                  <Icon sx={{
                fontSize: 16
              }} />
                </a>
              </Link>)}
          </FlexBox>
        </FlexBox>
      </StyledContainer>
    </TopbarWrapper>;
};
const socialLinks = [{
  id: 1,
  Icon: FaTiktok,
  url: "https://www.tiktok.com/@sweetsips24",
  target: "_blank",
  rel:"noreferrer"
}, {
  id: 2,
  Icon: Facebook,
  url: "https://www.facebook.com/profile.php?id=61556662798449-targetblank",
  target: "_blank",
  rel:"noreferrer"
}];

const languageList = [{
  title: "EN",
  value: "en"
}, {
  title: "AR",
  value: "ar"
}
, {
  title: "TR",
  value: "tr"
}

];
export default Topbar;