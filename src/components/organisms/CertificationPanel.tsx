import { useRouter } from "next/router";
import { AiFillEye } from "react-icons/ai";
import { config } from "../../env";
import { Certification } from "../../utils/types";

const CertificationPanel = ({
  certification,
}: {
  certification: Partial<Certification>;
}) => {
  const { name } = certification;
  const { push } = useRouter();

  const linkToCertification = new URL(
    `${config.nextPublicBaseUrl}/certifications/${encodeURIComponent(name)}`
  );

  return (
    <>
      <div
        className={`flex flex-row bg-light-light dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg items-center cursor-pointer border border-light-light dark:border-dark-light hover:bg-light-dark hover:border-light-graybutton hover:dark:bg-dark-radargrid hover:dark:border-dark-graybutton`}
      >
        <div className={`flex flex-col w-full`}>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="text-xl cursor-pointer">{name}</h2>
            </div>
          </div>
        </div>
        <div
          className="flex w-1/6 justify-end cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            push(linkToCertification);
          }}
        >
          <AiFillEye
            className="p-1 rounded-2xl hover:bg-dark-light hover:text-light-light hover:dark:bg-light-light hover:dark:text-light-graytext"
            size={30}
          />
        </div>
      </div>
    </>
  );
};

export default CertificationPanel;
