import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HomePanel from "../components/HomePanel";
import Loading from "../components/Loading";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";
import { computeFilterUrl } from "../utils/computeFilterUrl";
import { useFetchZenikaPageData } from "../utils/fetchers/useFetchZenikaPageData";
import { FilterData } from "../utils/types";

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
  }, [agency, agencies, computedAgency]);

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
                    computeFilterUrl(
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
