const LevelBar = ({ color, level }) => {
  return (
    <div className="flex flex-row justify-around">
      <div
        className={`gradient-${color} w-4 h-2 rounded ${
          level >= 1 ? "" : "opacity-25"
        }`}
      />
      <div
        className={`gradient-${color} w-4 h-2 ml-1 rounded ${
          level >= 2 ? "" : "opacity-25"
        }`}
      />
      <div
        className={`gradient-${color} w-4 h-2 ml-1 rounded ${
          level >= 3 ? "" : "opacity-25"
        }`}
      />
      <div
        className={`gradient-${color} w-4 h-2 ml-1 rounded ${
          level >= 4 ? "" : "opacity-25"
        }`}
      />
      <div
        className={`gradient-${color} w-4 h-2 ml-1 rounded ${
          level >= 5 ? "" : "opacity-25"
        }`}
      />
    </div>
  );
};

export default LevelBar;
