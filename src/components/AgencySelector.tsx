import { gql, useQuery } from "@apollo/client";
import { AgencySelectorQueryQuery } from "../generated/graphql";
import Loading from "./Loading";

const AGENCY_SELECTOR_QUERY = gql`
  query agencySelectorQuery {
    Agency {
      name
    }
  }
`;

const AgencySelector = ({ setAgency }) => {
  const { data, loading } = useQuery<AgencySelectorQueryQuery>(
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
          className="bg-light-panel dark:bg-dark-panel flex-grow-0 rounded-full py-3 px-6 mx-6"
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
