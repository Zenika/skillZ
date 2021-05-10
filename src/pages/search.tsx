import { useRouter } from "next/router";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";

const Search = ({ pathName }) => {
  const { query } = useRouter();
  const { context } = query;
  return (
    <PageWithNavAndPanel pathName={pathName} context={context}>
      <div className="flex flex-auto flex-row mx-4 text-center">
        Work in progress
      </div>
    </PageWithNavAndPanel>
  );
};

export default Search;
