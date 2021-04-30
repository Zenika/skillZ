const LevelBar = ({ color, level }) => {
  return (
    <div className="flex flex-row justify-around">
      {[1, 2, 3, 4, 5].map((i) => {
        if (level >= i + 1) {
          return (
            <div
              className={`gradient-${color} w-4 h-2 ml-1 rounded opacity-100`}
            />
          );
        } else if (level > i && level <= i + 0.25) {
          console.log("level", level);
          return (
            <>
              <div
                className={`gradient-${color} w-1 h-2 ml-1 rounded-l opacity-100`}
              />
              <div
                className={`gradient-${color} w-3 h-2 rounded-r opacity-25`}
              />
            </>
          );
        } else if (level > i && level <= i + 0.5) {
          console.log("level", level);
          return (
            <>
              <div
                className={`gradient-${color} w-2 h-2 ml-1 rounded-l opacity-100`}
              />
              <div
                className={`gradient-${color} w-2 h-2 rounded-r opacity-25`}
              />
            </>
          );
        } else if (level > i && level <= i + 0.75) {
          console.log("level", level);
          return (
            <>
              <div
                className={`gradient-${color} w-3 h-2 ml-1 rounded-l opacity-100`}
              />
              <div
                className={`gradient-${color} w-1 h-2 rounded-r opacity-25`}
              />
            </>
          );
        } else {
          return (
            <div
              className={`gradient-${color} w-4 h-2 ml-1 rounded opacity-25`}
            />
          );
        }
      })}
    </div>
  );
};

export default LevelBar;
