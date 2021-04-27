import React, { useContext } from "react";
import { i18nContext } from "../../utils/i18nContext";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import CommonPage from "../../components/CommonPage";
import CustomSelect from "../../components/CustomSelect";
import { gql, useQuery } from "@apollo/client";

const USER_AGENCY_AND_AGENCIES_QUERY = gql`
  query getUserAgencyAndAllAgencies($email: String!) {
    UserAgency(where: { userEmail: { _eq: $email } }) {
      agency
    }
    Agency {
      name
    }
    Topic {
      name
      UserTopics(where: { userEmail: { _eq: $email } }) {
        created_at
      }
    }
  }
`;

type GetUserAgencyAndAllAgenciesResult = {
  UserAgency: { agency: string }[];
  Agency: { name: string }[];
  Topic: { name: string; UserTopics: { created_at: string }[] }[];
};

const Profile = () => {
  const { user } = useAuth0();
  const { t, changeLocale } = useContext(i18nContext);
  const { data, error } = useQuery<GetUserAgencyAndAllAgenciesResult>(
    USER_AGENCY_AND_AGENCIES_QUERY,
    {
      variables: { email: user?.email },
    }
  );
  const userAgency = error || !data ? "" : data.UserAgency[0]?.agency;
  const agencies =
    error || !data ? [] : data.Agency.map((agency) => agency.name);
  const topics = error || !data ? [] : data.Topic;
  console.log("topics", topics);
  return (
    <CommonPage page={"profile"} faded={false}>
      <div className="flex flex-row justify-center mt-4 mb-20">
        <div className="flex flex-col justify-center max-w-screen-md w-full p-4">
          <div className="flex flex-row justify-start my-2">
            <img
              className="w-16 h-16 mx-4 rounded-full"
              src={user?.picture || ""}
            />
            <div className="flex flex-col mx-4 justify-center">
              <span>{user?.name}</span>
            </div>
          </div>
          <div className="flex flex-col justify-around rounded-lg bg-dark-dark my-2 p-2">
            <CustomSelect
              choices={agencies}
              selectedChoice={userAgency}
              onChange={(value: string) => console.log("change", value)}
            />
            <div className="p-2">My prefered method of contact</div>
            <div className="flex flex-row justify-center p-2 w-full">
              <div className="flex flex-row justify-around">
                <div className={`rounded-full m-2 gradient-red-faded`}>
                  <span className="px-2 py-1 text-white">Email</span>
                </div>
                <div className={`rounded-full m-2 gradient-red-faded`}>
                  <span className="px-2 py-1 text-white">Slack</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row flex-wrap justify-around rounded-lg bg-dark-dark my-2 p-2">
            {topics.map((topic) => (
              <div
                key={topic.name}
                className={`rounded-full m-2 ${
                  topic.UserTopics.length <= 0
                    ? "gradient-red-faded"
                    : "gradient-red"
                }`}
              >
                <span className="px-2 py-1 text-white">{topic.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CommonPage>
  );
};

export default withAuthenticationRequired(Profile);
