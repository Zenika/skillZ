import { useEffect } from "react";
import { useContext } from "react";
import { i18nContext } from "../../utils/i18nContext";
import { Notifications } from "../../utils/types";
import { useMutation } from "@apollo/client";
import { UPDATE_NOTIFICATION_CHECK } from "../../graphql/mutations/notifications";
// import { } from "../../generated/graphql";

const NotificationsPanel = ({
  notification,
}: {
  notification: Notifications;
}) => {
  /*
   * STATES
   */
  const { t } = useContext(i18nContext);
  const notificationTrad = {
    adminMail: notification.admin_email,
    skillName: notification.skill?.name,
  };

  /*
   * MUTATIONS
   */
  const [updateNotificationCheck] = useMutation(UPDATE_NOTIFICATION_CHECK, {
    variables: {
      id: notification.id,
    },
  });
  console.log("coucou");

  useEffect(() => {
    updateNotificationCheck();
  }, []);

  return (
    <div
      className={`flex relative flex-row bg-light-light dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg border border-light-light dark:border-dark-light`}
    >
      {notification.checked === false && (
        <div className="absolute top-0 right-0 inline-flex justify-center items-center w-15 h-15 text-xs font-bold text-light-ultrawhite bg-dark-red rounded-full dark:border-gray-900">
          {t("notification.new")}
        </div>
      )}
      <div className="flex flex-col">
        <h1 className="font-bold font text-xl">
          {t("notification.notificationTypeAccepted")}
        </h1>

        <div className="flex flex-row w-full">
          <p className="text-xl">
            {t("notification.notificationText").replace(
              /adminMail|skillName/gi,
              (matched) => notificationTrad[matched]
            )}
          </p>
        </div>

        <p className="opacity-50">{notification.created_at}</p>
      </div>
    </div>
  );
};

export default NotificationsPanel;
