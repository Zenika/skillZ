import HomePanel from "../components/HomePanel";
import Topbar from "../components/Topbar";

const mockData = {
  "top-left": {
    pos: ["top", "left"],
    color: "yellow",
    label: "Languages & Frameworks",
    data: ["Angular", "Javascript", "VueJS"],
    certifs: 1,
  },
  "top-right": {
    pos: ["top", "right"],
    color: "violet",
    label: "Platforms",
    data: ["Github", "K3s"],
    certifs: 0,
  },
  "bot-left": {
    pos: ["bot", "left"],
    color: "blue",
    label: "Tools",
    data: ["Chrome Dev Tools"],
    certifs: 0,
  },
  "bot-right": {
    pos: ["bot", "right"],
    color: "cyan",
    label: "Technics & Methods",
    data: [],
    certifs: 0,
  },
};

const Home = () => {
  return (
    <div>
      <Topbar />
      <div className="flex flex-auto flex-row mx-4 flex-wrap">
        <HomePanel props={mockData["top-left"]} />
        <HomePanel props={mockData["top-right"]} />
        <HomePanel props={mockData["bot-left"]} />
        <HomePanel props={mockData["bot-right"]} />
      </div>
    </div>
  );
};

export default Home;
