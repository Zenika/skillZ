import React from "react";
import Image from "next/image";

export const BadgeSubojectives = ({ src }) => {
  return (
    <div className="bg-dark-light p-4 mt-4 -mr-4 -ml-4 mb-0">
      <Image
        className="object-fill h-48 w-full object-center"
        src={src}
        width="35"
        height="35"
      />
    </div>
  );
};
