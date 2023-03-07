import React from "react";
import CommonPage from "../components/templates/CommonPage";
import { GET_NOTIFICATIONS } from "../graphql/queries/notifications";
import { GetNotificationsQuery } from "../generated/graphql";
import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import NotificationsPanel from "../components/organisms/NotificationPanel";

const Notifications = ({}) => {
  /*
   * STATES
   */
  const { user } = useAuth0();
  /*
   * QUERIES
   */
  const { data: notifications } = useQuery<GetNotificationsQuery>(
    GET_NOTIFICATIONS,
    {
      variables: {
        userEmail: user?.email,
      },
      fetchPolicy: "network-only",
    }
  );

  return (
    <CommonPage page={"Notifications"}>
      <div>
        {notifications?.UserNotifications.length > 0 &&
          notifications.UserNotifications.map((notification, key) => (
            <NotificationsPanel notification={notification} key={key} />
          ))}
      </div>
    </CommonPage>
  );
};

export default Notifications;
