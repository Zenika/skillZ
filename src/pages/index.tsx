import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import HomePanel from "../components/HomePanel";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

type UserData = {
  User: {
    email: string
  }[]
}

const USER_QUERY = gql`
  query queryUser($email: String!) {
    User(where: { email: { _eq: $email } }) {
      email
    }
  }
`;

const mockData = {
  "top-left": {
    pos: ["top", "left"],
    color: "yellow",
    name: "languagesAndFrameworks",
    data: ["Angular", "Javascript", "VueJS"],
    certifs: 1,
  },
  "top-right": {
    pos: ["top", "right"],
    color: "violet",
    name: "platforms",
    data: ["Github", "K3s"],
    certifs: 0,
  },
  "bot-left": {
    pos: ["bot", "left"],
    color: "blue",
    name: "tools",
    data: ["Chrome Dev Tools"],
    certifs: 0,
  },
  "bot-right": {
    pos: ["bot", "right"],
    color: "cyan",
    name: "methods",
    data: [],
    certifs: 0,
  },
};

const Home = ({ pathName }) => {
  const { push } = useRouter();
  const { user, isLoading } = useAuth0();

  if (user) {
    const { data } = useQuery<UserData>(USER_QUERY, {
      variables: { email: user.email },
    });
    if (data?.User.length <= 0) {
      push("/onboarding");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Topbar />
      <div className="flex flex-auto flex-row mx-4 flex-wrap">
        <HomePanel props={mockData["top-left"]} />
        <HomePanel props={mockData["top-right"]} />
        <HomePanel props={mockData["bot-left"]} />
        <HomePanel props={mockData["bot-right"]} />
      </div>
      <Navbar path={pathName} />
    </div>
  );
};

export default withAuthenticationRequired(Home);
