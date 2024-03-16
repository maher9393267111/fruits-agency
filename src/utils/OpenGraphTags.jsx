import React from "react";
const OpenGraphTags = () => {
  return <React.Fragment>
      <meta property="og:url" content="https://www.sweetsips.com.tr" />
      {/* thumbnail And title for social media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="SWEETSIPS" />
      <meta property="og:description" content="SWEETSIPS" />
      <meta property="og:image" content="/assets/logo.png" />
    </React.Fragment>;
};
export default OpenGraphTags;