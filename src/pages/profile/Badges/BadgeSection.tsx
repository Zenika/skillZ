import React, { Component } from "react";
import Image from "next/image";

const BadgeSection = () => {
  return (
    <div className="flex ">
      <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/medaille.svg"
        width="45"
        height="45"
        color="gray"
      />
    </div>
  );
};

export default BadgeSection;
