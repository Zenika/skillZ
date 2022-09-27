import { useContext } from "react";
import { useDarkMode } from "../../../utils/darkMode";
import { i18nContext } from "../../../utils/i18nContext";
import { UserCertification } from "../../../utils/types";

type CertificationsList = {
  userCertifications: UserCertification[];
  readOnly: boolean;
  onUserCertificationSelect?;
  onUserCertificationAdd?;
};

const CertificationsList = ({
  userCertifications,
  readOnly,
  onUserCertificationSelect = () => {},
  onUserCertificationAdd = () => {},
}: CertificationsList) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const today = new Date();

  return (
    <div
      className={`flex flex-col rounded-lg ${
        darkMode
          ? "bg-light-dark dark:bg-dark-dark my-2 p-2"
          : "bg-light dark:bg-dark-dark my-2 p-2"
      }`}
      id={"certifications"}
    >
      <span className="text-xl p-2">{t("userProfile.certifications")}</span>
      <div className="flex flex-row flex-wrap justify-around">
        {userCertifications?.map((userCert) => (
          <button
            disabled={readOnly ? true : false}
            key={userCert.Certification.name + userCert.from}
            className={`rounded-md m-2 gradient-red${
              userCert.obtained ? "" : "-faded"
            } ${readOnly ? "cursor-default" : ""}`}
            onClick={() => onUserCertificationSelect(userCert)}
          >
            <span className="px-2 py-1 text-white">{`${userCert.Certification.certBody} - ${userCert.Certification.name}`}</span>
            <br />
            <span className="px-2 py-1 text-white">{`${
              userCert.obtained
                ? t("userProfile.validFrom")
                : t("userProfile.targeting")
            } ${userCert.from} ${
              userCert.to ? ` ${t("userProfile.validTo")} ${userCert.to}` : ""
            }`}</span>
          </button>
        ))}
        {!readOnly ? (
          <button
            className="rounded-full m-2 gradient-red w-10 h-15"
            title={t("userProfile.addCert")}
            onClick={() => onUserCertificationAdd()}
            id={"add-certification"}
          >
            <span className="px-1 py-1 text-white font-bold text-xl">+</span>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default CertificationsList;
