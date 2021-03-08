import { gql, useQuery } from "@apollo/client";
import Loading from "./Loading";

type AgenciesList = { Agency: [{ name: string }] };

const AGENCY_SELECTOR_QUERY = gql`
  query agencySelectorQuery {
    Agency {
      name
    }
  }
`;

const AgencySelector = ({ setAgency }) => {
  const { data, error, loading } = useQuery<AgenciesList>(
    AGENCY_SELECTOR_QUERY
  );
  const agencies = data?.Agency.map((agency) => agency.name);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {agencies?.map((agency) => (
        <button
          className="dark:bg-dark-panel flex-grow-0 rounded-full py-3 px-6 mx-6"
          key={agency}
          onClick={() => setAgency(agency)}
        >
          {agency}
        </button>
      ))}
    </>
  );
};

export default AgencySelector;
