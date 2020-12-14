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

const Greetings: React.FC = () => {
  return <>greetings</>;
};

export default Greetings;
