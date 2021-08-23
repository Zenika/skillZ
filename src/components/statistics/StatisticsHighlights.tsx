import React from "react";
import Image from "next/image";

export const StatisticsHighlights = ({ src, number, libelle }) => {
  return (
    <section className="flex border-2 solid rounded-lg p-3 pr-16 static max-w-md">
      <Image src={src} width="38" height="38" color="" />
      <div className="flex flex-col pl-4">
        <p className="text-xl font-semibold">{number}</p>
        <p className="">{libelle}</p>
      </div>
    </section>
  );
};
