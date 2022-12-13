import Image from "next/image";
import Link from "next/link";

type User = { name: string; picture: string; agency: string; email: string };
const UserPanel = ({ user, context }: { user: User; context: string }) => {
  const { name, picture, agency } = user;

  return (
    <Link href={`/profile/${user?.email}`}>
      <div className="flex flex-row bg-light-light dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg cursor-pointer border border-light-light dark:border-dark-light hover:bg-light-dark hover:border-light-graybutton hover:dark:bg-dark-radargrid hover:dark:border-dark-graybutton">
        <div
          className={`flex flex-col ${
            context !== "zenika" ? "w-5/6" : "w-full"
          }`}
        >
          <div className="flex flex-row justify-start">
            <Image
              className="h-16 w-16 rounded-full"
              height="64"
              width="64"
              src={picture || ""}
              alt={name}
            />
            <div className="flex flex-col ml-4">
              <div className="flex flex-row">
                <h2 className="text-xl">{name}</h2>
              </div>
              <h3 className="text-md">{`Zenika ${agency}`}</h3>
            </div>
          </div>
        </div>
        <div className="flex w-1/6 justify-end">
          <Image
            src={`/icons/light/chevron.svg`}
            width="8"
            height="12"
            alt={"arrow"}
          />
        </div>
      </div>
    </Link>
  );
};

export default UserPanel;
