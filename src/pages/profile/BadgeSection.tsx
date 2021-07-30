import React, { Component } from "react";
import Image from "next/image";

const BadgeSection = () => {
  return (
    <div className="flex ">
      <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/bronze.png"
        width="68"
        height="68"
      />
    </div>
  );
};

export default BadgeSection;
