import PageWithNavAndPanel from "../components/PageWithNavAndPanel";

const Search = ({ pathName }) => {
  return (
    <PageWithNavAndPanel pathName={pathName}>
      <div className="flex flex-auto flex-row mx-4 text-center">
        Search page
      </div>
    </PageWithNavAndPanel>
  );
};

export default Search;
