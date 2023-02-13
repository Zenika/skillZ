import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import Loading from "../../components/molecules/Loading";
import Profile from "../../components/organisms/Profile";
import ErrorPage from "../../components/templates/ErrorPage";

const ProfilePage = () => {
  // HOOKS
  const { user, isLoading, error: authError } = useAuth0();

  if (isLoading) {
    return <Loading />;
  } else if (authError) {
    return <ErrorPage />;
  } else {
    return (
      <Profile
        userEmail={user.email}
        userName={user.name}
        userPicture={user.picture}
        readOnly={false}
      />
    );
  }
};

export default withAuthenticationRequired(ProfilePage);
