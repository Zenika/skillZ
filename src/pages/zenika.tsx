import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CommonPage from "../components/templates/CommonPage";
import ErrorPage from "../components/templates/ErrorPage";
import FilterByPanel from "../components/molecules/FilterByPanel";
import HomePanel from "../components/organisms/HomePanel/HomePanel";
import Loading from "../components/molecules/Loading";
import { computeFilterUrl } from "../utils/computeFilterUrl";
import { useFetchZenikaPageData } from "../utils/fetchers/useFetchZenikaPageData";
import { FilterData } from "../utils/types";

const Zenika = () => {
  const { user, isLoading: userLoading, error: userError } = useAuth0();
  const { query, push } = useRouter();
  const { agency } = query;
  const computedAgency = agency
    ? typeof agency === "string"
      ? agency
      : agency.join("")
    : undefined;
  const [filterByAgency, setFilterByAgency] = useState<
    FilterData<string> | undefined
  >(undefined);

  const {
    homePanelData,
    agencies,
    error: dataError,
    loading: dataLoading,
  } = useFetchZenikaPageData(user.email || "", computedAgency);

  useEffect(() => {
    setFilterByAgency({
      name: "Agency",
      values: agencies?.map((agency) => agency.name) || [],
      selected: computedAgency,
    });
  }, [agency, agencies, computedAgency]);

  if (userLoading || dataLoading) {
    return <Loading />;
  } else if (dataError || userError) {
    return <ErrorPage />;
  }
  return (
    <CommonPage page={"Zenika"}>
      {filterByAgency && (
        <div className="m-4">
          <FilterByPanel
            filters={[
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
            ]}
          />
        </div>
      )}
      <div className="flex flex-row mx-4 flex-wrap mb-20">
        {homePanelData &&
          homePanelData.map((computedDataSkill) => (
            <HomePanel
              props={computedDataSkill}
              key={`home-panel-${computedDataSkill.name}`}
            />
          ))}
      </div>
    </CommonPage>
  );
};

export default withAuthenticationRequired(Zenika, {
  loginOptions: { prompt: "login" },
});
