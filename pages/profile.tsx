import React from "react";

import { withAuth, withLoginRequired } from "use-auth0-hooks";

const Profile = ({ auth }) => {
  const { user } = auth;
  return (
    <div>
      <h1>Profile</h1>
      <p>This is the Profile page.</p>
      <pre>{JSON.stringify(user || {}, null, 2)}</pre>
    </div>
  );
};

export default withLoginRequired(withAuth(Profile as any) as any);
