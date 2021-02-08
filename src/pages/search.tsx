import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";

const Search = ({ pathName }) => {
  return (
    <div>
      <Topbar />
      <div className="flex flex-auto flex-row mx-4 text-center">
        Search page
      </div>
      <Navbar path={pathName} />
    </div>
  );
};

export default Search;
