import { useMutation, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import differenceInMinutes from "date-fns/differenceInMinutes";
import React, { createContext, useContext, useEffect, useState } from "react";
import { GetUserQuery } from "../generated/graphql";
import { UPDATE_USER_ACTIVITY } from "../graphql/mutations/userInfos";
import { GET_USER_QUERY } from "../graphql/queries/userInfos";

type ActivityProviderType = {
  lastSeen: Date;
};

const ActivityProviderContext = createContext<ActivityProviderType | undefined>(
  undefined
);

export interface AuthProviderProps {
  children: React.ReactNode;
}

const ActivityProvider = ({
  children,
}: AuthProviderProps): React.ReactElement => {
  const [lastSeen, setLastSeen] = useState<Date | null>(null);

  const { user } = useAuth0();
  const { data: userData } = useQuery<GetUserQuery>(GET_USER_QUERY, {
    variables: { email: user?.email },
    fetchPolicy: "network-only",
  });

  const [updateLastSeenMutation] = useMutation(UPDATE_USER_ACTIVITY);

  useEffect(() => {
    setLastSeen(new Date(userData?.User[0].last_seen));
  }, [userData]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      if (differenceInMinutes(currentDate, lastSeen) < 10) return;

      updateLastSeenMutation({
        variables: { email: user.email, last_seen: currentDate },
      })
        .then(() => {
          setLastSeen(currentDate);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 60000);
    return () => clearInterval(interval);
  }, [lastSeen, updateLastSeenMutation, user?.email]);

  return (
    <ActivityProviderContext.Provider value={{ lastSeen: new Date(lastSeen) }}>
      {children}
    </ActivityProviderContext.Provider>
  );
};

export default ActivityProvider;

export const useActivity = (): ActivityProviderType => {
  const context = useContext<ActivityProviderType | undefined>(
    ActivityProviderContext
  );
  if (!context) {
    throw new Error("useActivity must be used within a ActivityProvider");
  }
  return context;
};
