import React, { Component } from "react";
import Image from "next/image";

export const BadgeSection = () => {
  return (
    <div>
      <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/medaille.svg"
        width="35"
        height="35"
      />
    </div>
  );
};
