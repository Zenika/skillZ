import { withAuthenticationRequired } from "@auth0/auth0-react";
import HomePanel from "../components/HomePanel";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";

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

const Home = ({pathName}) => {
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
