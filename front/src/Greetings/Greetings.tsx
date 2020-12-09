import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { of } from "await-of";
import "./Greetings.css";
import { appStateContext } from "../AppContext";
import { isValidEmail } from "../utils";
import { fetchAPI } from "../api/api";
import { QUERIES } from "../api/queries";
import { API_URL } from "../config";
import { MUTATIONS } from "../api/mutations";
import { User } from "../types";

const authenticate = async (email: string): Promise<User | undefined> => {
  const [user] = (
    await fetchAPI(
      fetch,
      API_URL,
      { query: QUERIES.getUser, variables: { email } },
      { "x-hasura-admin-secret": "key" }
    )
  ).data.User;
  if (!user) {
    return;
  }
  return user;
};

const createUser = async ({ email, firstName, lastName, agencyId }: User) => {
  const [createdUser] = (
    await fetchAPI(
      fetch,
      API_URL,
      {
        query: MUTATIONS.createUser,
        variables: {
          email,
          firstName,
          lastName,
          agencyId,
        },
      },
      { "x-hasura-admin-secret": "key" }
    )
  ).data.insert_User.returning;
  return createdUser;
};

const Greetings: React.FC = () => {
  const { appState, setAppState } = useContext(appStateContext);
  const { t } = useTranslation();
  const [inputEmail, setInputEmail] = useState("");
  const [inputError, setInputError] = useState("");
  const [userExists, setUserExists] = useState(true);
  const [selectedAgencyId, setSelectedAgencyId] = useState("");

  const handleEmailInputChange = (e: any) =>
    setInputEmail(e.target.value || "");

  const handleSelectAgencyChange = (e: any) =>
    setSelectedAgencyId(e.target.value || "");

  const login = () => {
    setInputError("");
    if (!isValidEmail(inputEmail)) {
      setInputError(t("login.invalidEmail"));
      return;
    }
    (async () => {
      const [user, err] = await of(authenticate(inputEmail));
      if (err) {
        console.error(err); // TODO: Handle errors with toast
        return;
      }
      if (!user) {
        setUserExists(false);
        return;
      }
      console.log("login completed");
    })();
  };

  const register = () => {
    if (!selectedAgencyId || selectedAgencyId === "") {
      console.error("selectedAgencyId has a wrong value", selectedAgencyId); // TODO: Handle errors with toast
      return;
    }
    (async () => {
      // not great but we should have this info from the auth service anyway so it's only temporary
      const beforeAt = inputEmail.split("@")[0];
      const [firstName, lastName] = beforeAt.split(".");
      const [user, err] = await of(
        createUser({
          email: inputEmail,
          firstName,
          lastName,
          agencyId: selectedAgencyId,
        })
      );
      if (err) {
        console.error(err); // TODO: Handle errors with toast
        return;
      }
      console.log("registration completed", user);
    })();
  };

  return (
    <div className="login">
      <h1>{t("login.title")}</h1>
      <div className="loginContainer">
        <h2>{t("login.description")}</h2>
        <ul>
          <li>
            {t("login.email")}:
            <input onChange={handleEmailInputChange} type="text" />
          </li>
          <li>{inputError}</li>
          {userExists === true ? (
            <li>
              <button type="submit" onClick={() => login()}>
                {t("login.submit")}
              </button>
            </li>
          ) : (
            <div>
              <li>
                <h2>{t("login.noAccountDescription")}</h2>
              </li>
              <li>
                <p>{t("login.agency")}</p>
                <select onChange={handleSelectAgencyChange}>
                  {appState.agencies.map((agency) => (
                    <option key={agency.id} value={agency.id}>
                      {t(`agencies.${agency.id}`)}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <button type="submit" onClick={() => register()}>
                  {t("login.register")}
                </button>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Greetings;
