import { useAuth0 } from "@auth0/auth0-react";
import HomePanel from "../components/HomePanel";
import Loading from "../components/Loading";
import { gql, useQuery } from "@apollo/client";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FilterData } from "../utils/types";
import { useComputeFilterUrl } from "../utils/useComputeFilterUrl";
import {
  GetSkillsAndDesiresByAgencyQuery,
  GetSkillsAndDesiresQuery,
} from "../generated/graphql";
import {
  GET_SKILLS_AND_DESIRES_QUERY,
  GET_SKILLS_AND_DESIRES_BY_AGENCY_QUERY,
} from "../graphql/queries/skills";
import { useFetchZenikaPageData } from "../utils/fetchers/useFetchZenikaPageData";

const Zenika = ({ pathName }) => {
  const { user, isLoading } = useAuth0();
  const { query, push } = useRouter();
  const { context, agency } = query;
  const computedAgency = agency
    ? typeof agency === "string"
      ? agency
      : agency.join("")
    : undefined;
  const [filterByAgency, setFilterByAgency] = useState<
    FilterData<string> | undefined
  >(undefined);
  const { homePanelData, agencies, error } = useFetchZenikaPageData(
    user.email || "",
    computedAgency
  );
  useEffect(() => {
    setFilterByAgency({
      name: "Agency",
      values: agencies?.map((agency) => agency.name) || [],
      selected: computedAgency,
    });
  }, [agency, agencies]);

  return (
    <PageWithNavAndPanel
      pathName={pathName}
      context={context}
      filters={
        filterByAgency
          ? [
              {
                name: filterByAgency.name,
                values: ["World", ...filterByAgency.values],
                selected: filterByAgency.selected,
                callback: (value) =>
                  push(
                    useComputeFilterUrl(
                      `${window.location}`,
                      value ? [{ name: "agency", value: `${value}` }] : []
                    )
                  ),
              },
            ]
          : undefined
      }
    >
      <div className="flex flex-auto flex-row mx-4 flex-wrap mb-20">
        {homePanelData ? (
          homePanelData.map((computedDataSkill) => (
            <HomePanel
              props={computedDataSkill}
              key={`home-panel-${computedDataSkill.name}`}
            />
          ))
        ) : error ? (
          <p>{`Error: ${error.name}, Message: ${error.message}`}</p>
        ) : (
          <Loading />
        )}
      </div>
    </PageWithNavAndPanel>
  );
};

export default Zenika;
