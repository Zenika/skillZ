import React from "react";
import Image from "next/image";

export const BadgeSubojectives = ({ src }) => {
  return (
    <Image
      className="object-fill h-48 w-full object-center"
      src={src}
      width="35"
      height="35"
    />
  );
};
