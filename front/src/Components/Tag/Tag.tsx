import React from "react";
import "./Tag.css";

const Tag = ({ name, onClick }: { name: string; onClick: () => void }) => {
  return (
    <div className="tag" onClick={onClick}>
      <span>{name}</span>
    </div>
  );
};

export default Tag;
