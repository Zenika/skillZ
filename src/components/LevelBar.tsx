const LevelBar = ({
  color,
  level,
  name,
}: {
  color: string;
  level: number;
  name?: string;
}) => {
  console.log(`${name}: ${level}`);
  return (
    <div className="flex flex-row justify-around">
      {[0, 1, 2, 3, 4].map((i) => {
        if (level >= i + 1) {
          return (
            <div
              className={`gradient-${color} w-4 h-2 ml-1 rounded opacity-100`}
            />
          );
        } else if (level > i && level <= i + 0.5) {
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
        } else if (level > i && level <= i + 0.75) {
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
        } else if (level > i && level <= i + 0.99) {
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
