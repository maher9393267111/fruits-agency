import React from "react";
import { useTranslation } from "next-i18next";

const About = () => {
  const { t } = useTranslation("common");

  return (
    <div className="my-5">
      <div>
        <div className="m-auto  text-center text-3xl  font-bold my-1">
          {t("about.title")}
        </div>
        <span>{t("about.p1")}</span>
        <span className="mx-1  font-semibold">{t("about.p2")}</span>

        <span>{t("about.p3")} </span>
      </div>
      <div className="font-bold text-lg">{t("about.p4")}</div>

      <ol className="list-decimal mx-4 ">
        <li>
          <span className="font-bold">{t("about.1")}</span>
          <span className="mx-1">{t("about.1a")}</span>
        </li>

        <li>
          <span className="font-bold"> {t("about.2")}</span>
          <span className="mx-1">{t("about.2a")}</span>
        </li>

        <li>
          <span className="font-bold"> {t("about.3")}</span>
          <span className="mx-1">{t("about.3a")}</span>
        </li>

        <li>
          <span className="font-bold"> {t("about.4")}</span>
          <span className="mx-1">{t("about.4a")}</span>
        </li>

        <li>
          <span className="font-bold"> {t("about.5")}</span>
          <span className="mx-1">{t("about.5a")}</span>
        </li>

        <li>
          <span className="font-bold"> {t("about.6")}</span>
          <span className="mx-1">{t("about.6a")}</span>
        </li>

        <li>
          <span className="font-bold"> {t("about.7")}</span>
          <span className="mx-1">{t("about.7a")}</span>
        </li>

        <li>
          <span className="font-bold"> {t("about.8")}</span>
          <span className="mx-1">{t("about.8a")}</span>
        </li>

        <li>
          <span className="font-bold"> {t("about.9")}</span>
          <span className="mx-1">{t("about.9a")}</span>
        </li>

        <li>
          <span className="font-bold"> {t("about.10")}</span>
          <span className="mx-1">{t("about.10a")}</span>
        </li>

      </ol>

    <div className="my-1"> {t("about.p5")}</div>
    </div>
  );
};

export default About;
