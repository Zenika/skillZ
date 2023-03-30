import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import React from "react";
import Tab from "../../components/atoms/Tab";
import Tabs from "../../components/atoms/Tabs";
import CommonPage from "../../components/templates/CommonPage";
import { config } from "../../env";
import Loading from "../molecules/Loading";
import { useI18n } from "../../providers/I18nProvider";

type AdminPageProps = {
  children: any;
};

export default function AdminPage({ children }: AdminPageProps) {
  const { user, isLoading } = useAuth0();
  const { pathname, push } = useRouter();
  const { t } = useI18n();

  if (isLoading) return <Loading />;

  if (
    pathname.startsWith("/admin") &&
    !config.nextPublicAdmins.split(";").find((admin) => admin === user.email)
  ) {
    push("/");
    return <Loading></Loading>;
  }

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
