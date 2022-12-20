import { useRouter } from "next/router";
import React, { useContext } from "react";
import Tab from "../../components/atoms/Tab";
import Tabs from "../../components/atoms/Tabs";
import CommonPage from "../../components/templates/CommonPage";
import { i18nContext } from "../../utils/i18nContext";

type AdminPageProps = {
  children: any;
};

export default function AdminPage({ children }: AdminPageProps) {
  const { t } = useContext(i18nContext);
  const { pathname } = useRouter();

  return (
    <CommonPage page={"Admin"} backBar={false}>
      <Tabs>
        <Tab
          title={t("admin.skills")}
          current={pathname === "/admin/skills"}
          href={{ pathname: "/admin/skills" }}
        />
        <Tab
          title={t("admin.categories")}
          current={pathname === "/admin/categories"}
          href={{ pathname: "/admin/categories" }}
        />
      </Tabs>
      {children}
    </CommonPage>
  );
}
