import React, { useContext } from "react";
import { useRouter } from "next/router";
import { i18nContext } from "../../../../utils/i18nContext";
import PageWithSkillList from "../../../../components/PageWithSkillList";

const AddSkill = () => {
  const router = useRouter();
  const { t } = useContext(i18nContext);
  const { context, category } = router.query;

  return (
    <PageWithSkillList context={context} category={category} add={true}><p>nothing here yet</p></PageWithSkillList>
  );
};

export default AddSkill;
