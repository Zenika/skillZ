import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import Button from "../components/Button";
import CommonPage from "../components/CommonPage";

const Search = () => {
  return (
    <CommonPage page={"search"} backBar={true}>
      <Button type={"primary"}>{"TEST"}</Button>
      <Button type={"secondary"}>{"TEST"}</Button>
      <Button type={"tertiary"}>{"TEST"}</Button>
      <Button type={"faded"}>{"TEST"}</Button>
    </CommonPage>
  );
};

export default withAuthenticationRequired(Search, {
  loginOptions: { prompt: "login" },
});
