import PageWithNavAndPanel from "../components/PageWithNavAndPanel";

const Zenika = ({ pathName }) => {
  return (
    <PageWithNavAndPanel pathName={pathName}>
      <div className="flex flex-auto flex-row mx-4 text-center">
        Zenika skills page
      </div>
    </PageWithNavAndPanel>
  );
};

export default Zenika;
