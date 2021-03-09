import React from "react";
import { useRouter } from "next/router";

const ViewSkill = () => {
  const router = useRouter();
  const { context, category } = router.query;

  return (
    <>
      context: {context}, category: {category}
    </>
  );
};

export default ViewSkill;
