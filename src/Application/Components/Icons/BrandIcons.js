import React from "react";
import { BiPlus } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import {
  SiGoogleanalytics,
  SiIntercom,
  SiMailchimp,
  SiStripe,
  SiSalesforce,
  SiShopify,
  SiLinkedin,
  SiHubspot,
  SiTwitter,
} from "react-icons/si";

import "./BrandIcons.css";

const defaultIconSize = 32;

const GoogleAnalyticsIcon = ({ size = defaultIconSize }) => {
  return (
    <div
      className="icon-container"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <SiGoogleanalytics color="#F5A200" size={`${size * 0.875}px`} />
    </div>
  );
};

const IntercomIcon = ({ size = defaultIconSize }) => {
  return (
    <div
      className="icon-container intercom"
      style={{
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: "5px",
      }}
    >
      <SiIntercom className="txt-1" size={`${size}px`} />
    </div>
  );
};

const MailchimpIcon = ({ size = defaultIconSize }) => {
  return (
    <div
      className="icon-container"
      style={{
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: `${size / 2}px`,
        backgroundColor: "#FDDD4C",
      }}
    >
      <SiMailchimp
        color="#000000"
        size={`${size * 0.75}px`}
        style={{ position: "relative", right: "6%" }}
      />
    </div>
  );
};

const StripeIcon = ({ size = defaultIconSize }) => {
  return (
    <div
      className="icon-container"
      style={{
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: "3px",
        backgroundColor: "#635CFF",
      }}
    >
      <SiStripe color="#ffffff" size={`${size * 0.55}px`} />
    </div>
  );
};

const SalesforceIcon = ({ size = defaultIconSize }) => {
  return (
    <div
      className="icon-container"
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
    >
      <SiSalesforce color="#00A1E0" size={`${size}px`} />
    </div>
  );
};

const FacebookIcon = ({ size = defaultIconSize }) => {
  return (
    <div
      className="icon-container"
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
    >
      <FaFacebookF color="#1977F2" size={`${size - 4}px`} />
    </div>
  );
};

const ShopifyIcon = ({ size = defaultIconSize }) => {
  return (
    <div
      className="icon-container"
      style={{
        height: `${size}px`,
        width: `${size}px`,
        position: "relative",
      }}
    >
      <SiShopify color="#96BF48" size={`${size}px`} style={{ zIndex: "50" }} />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "16%",
          backgroundColor: "#ffffff",
          height: `${size * 0.58}px`,
          width: `${size * 0.375}px`,
        }}
      />
    </div>
  );
};

const LinkedInIcon = ({ size = defaultIconSize }) => {
  return (
    <div
      className="icon-container"
      style={{
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: "5px",
        position: "relative",
      }}
    >
      <SiLinkedin color="#0B65C2" size={`${size}px`} style={{ zIndex: "50" }} />
      <div
        style={{
          position: "absolute",
          backgroundColor: "#ffffff",
          height: "80%",
          width: "80%",
        }}
      />
    </div>
  );
};

const HubspotIcon = ({ size = defaultIconSize }) => {
  return (
    <div
      className="icon-container"
      style={{
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: "5px",
        backgroundColor: "#FF7A59",
      }}
    >
      <SiHubspot color="#ffffff" size={`${size * 0.65}px`} />
    </div>
  );
};

const TwitterIcon = ({ size = defaultIconSize }) => {
  return (
    <div
      className="icon-container"
      style={{
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: `5px`,
        backgroundColor: "#1da1f2",
      }}
    >
      <SiTwitter color="#ffffff" size={`${size - 12}px`} />
    </div>
  );
};

const PlusIcon = ({ size = defaultIconSize }) => {
  return (
    <div
      className="icon-container"
      style={{
        height: `${size}px`,
        width: `${size}px`,
        backgroundColor: "transparent",
        borderRadius: "5px",
      }}
    >
      <BiPlus size={`${size * 0.8}px`} className="txt-1" />
    </div>
  );
};

const BrandIcons = {
  "google analytics": <GoogleAnalyticsIcon />,
  intercom: <IntercomIcon />,
  mailchimp: <MailchimpIcon />,
  stripe: <StripeIcon />,
  salesforce: <SalesforceIcon />,
  facebook: <FacebookIcon />,
  shopify: <ShopifyIcon />,
  linkedin: <LinkedInIcon />,
  hubspot: <HubspotIcon />,
  twitter: <TwitterIcon />,
  plus: <PlusIcon />,
};

const BrandIcons20 = {
  "google analytics": <GoogleAnalyticsIcon size={20} />,
  intercom: <IntercomIcon size={20} />,
  mailchimp: <MailchimpIcon size={20} />,
  stripe: <StripeIcon size={20} />,
  salesforce: <SalesforceIcon size={20} />,
  facebook: <FacebookIcon size={20} />,
  shopify: <ShopifyIcon size={20} />,
  linkedin: <LinkedInIcon size={20} />,
  hubspot: <HubspotIcon size={20} />,
  twitter: <TwitterIcon size={20} />,
  plus: <PlusIcon size={20} />,
};

export {
  BrandIcons,
  BrandIcons20,
  GoogleAnalyticsIcon,
  IntercomIcon,
  MailchimpIcon,
  StripeIcon,
  SalesforceIcon,
  FacebookIcon,
  ShopifyIcon,
  LinkedInIcon,
  PlusIcon,
};
