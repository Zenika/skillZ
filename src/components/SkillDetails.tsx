import { useQuery } from "@apollo/client/react";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { SkillDetailsQuery } from "../generated/graphql";
import { GET_SKILL_DETAILS } from "../graphql/queries/skills";
import { Skill } from "../utils/types";

const SkillDetails = ({ skill: { id } }: { skill: Skill }) => {
  const { user } = useAuth0();

  const {
    data: skillDetails,
    error,
    loading,
  } = useQuery<SkillDetailsQuery>(GET_SKILL_DETAILS, {
    variables: { skillId: id },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    console.log(skillDetails);
  }, [skillDetails]);

  return !loading ? (
    !error || !skillDetails ? (
      <div>
        <h1 className="text-xl">{skillDetails.Skill[0].name}</h1>
        <span className="text-sm text-dark-light/40">
          {skillDetails.Skill[0].description}
        </span>
        {/* <p>{skillDetails.UserSkillDesire[0].created_at}</p> */}
      </div>
    ) : (
      <div>No data accessible for this skill.</div>
    )
  ) : (
    <div>Loading ...</div>
  );
};

export default SkillDetails;
