import { useMutation } from "@apollo/client";
import { SET_BOT_NOTIFICATIONS } from "../graphql/mutations/botNotifications";
import { SlidingCheckbox } from "./SlidingCheckbox";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { GET_BOT_NOTIFICATIONS_QUERY } from "../graphql/mutations/botNotifications";
import { useQuery } from "@apollo/client";
import {
  GetBotNotificationsQuery,
} from "../generated/graphql";

type botNotificationsTypes = {
  User: {
    botNotifications?: boolean;
  };
};

export const BotNotifications = ({
  darkMode,
  t,
}: {
  darkMode: boolean;
  t: (path: string) => string;
}) => {
  const values: [any, any] = [false, true];
  const { error, user } = useAuth0();
  const {
    data: userDatas,
    error: errorUserDatas,
    loading,
  } = useQuery<botNotificationsTypes>(GET_BOT_NOTIFICATIONS_QUERY, {
    variables: { email: user?.email },
    fetchPolicy: "network-only",
  });
  const [setBotNotification, { error: mutationError }] = useMutation(
    SET_BOT_NOTIFICATIONS
  );

  useEffect(() => {
    if (userDatas) values[1];
    else values[0];
  }),
    [userDatas];
  //console.log(errorUserDatas);
  return (
    <div>
      {!errorUserDatas ? (
        <div
          className="cursor"
          onClick={() =>
            setBotNotification({
              variables: {
                email: user?.email,
                BotNotifications:
                  !userDatas.user[0]?.botNotifications,
              },
            })
          }
        >
          <span>{t("sidepanel.botNotifications")}</span>
          <ul className="flex flex-row justify-around">
            <li>☀️</li>
            <li>
              <SlidingCheckbox selectedValue={darkMode} values={values} />
            </li>
            <li>🌑</li>
          </ul>
        </div>
      ) : (
        loading
      )}
    </div>
  );
};
