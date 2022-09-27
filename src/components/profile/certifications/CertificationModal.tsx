import Image from "next/image";
import { useContext, useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { useDarkMode } from "../../../utils/darkMode";
import { i18nContext } from "../../../utils/i18nContext";
import { Certification, UserCertification } from "../../../utils/types";
import CustomSelect from "../../CustomSelect";

type CertificationModalProps = {
  userCertificationRef?: UserCertification;
  certificationsRef: Certification[];
  onCancel: () => void;
  onConfirm: (userCert: UserCertification) => void;
  onDelete: (userCert: UserCertification) => void;
};

const CertificationModal = ({
  userCertificationRef,
  certificationsRef,
  onCancel,
  onConfirm,
  onDelete,
}: CertificationModalProps) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();

  const [userCertification, setUserCertification] =
    useState<UserCertification>(userCertificationRef);

  const editMode =
    !!userCertificationRef && !!userCertificationRef.Certification;
  const [hasExpiryDate, setHasExpiryDate] = useState<boolean>(
    editMode && !!userCertificationRef.to
  );

  return (
    <div
      className="flex flex-col my-16 mx-6 bg-light-light dark:bg-dark-light p-6 rounded-lg max-w-screen-sm w-full z-50"
      id={"certification-modal"}
    >
      <div className="mb-4 flex flex-row place-content-between">
        <h1 className="flex-start px-2 my-4 text-xl text-bold">
          {editMode
            ? `${t("userProfile.certModal.editCert")} ${
                userCertificationRef?.Certification?.name
              }`
            : t("userProfile.certModal.addCert")}
        </h1>
        {editMode ? (
          <button
            className="mx-1 px-5 py-2 gradient-red rounded-full disabled:opacity-25 "
            onClick={() => onDelete(userCertificationRef)}
            title={t("userProfile.certModal.orDelete")}
            id={"certification-delete-button"}
          >
            <div className="grid justify-items-center">
              <RiDeleteBinFill />
            </div>
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col bg-light-med dark:bg-dark-med">
        <div className="m-4">
          <div className="flex flex-col">
            <button
              onClick={() => {
                setUserCertification({
                  ...userCertification,
                  obtained: !userCertification?.obtained,
                });
              }}
              className="flex flex-row text-left my-2"
            >
              <span className="shrink-0 my-0.5">
                <Image
                  src={`/icons/${darkMode ? "dark" : "light"}/${
                    userCertification?.obtained ? "full" : "empty"
                  }-select.svg`}
                  height={32}
                  width={32}
                  layout="fixed"
                />
              </span>
              <span className="ml-2 mt-1 text-base">
                {t("userProfile.certModal.obtained")}
              </span>
            </button>
            <CustomSelect
              labelFn={(cert) => `${cert?.certBody} - ${cert?.name}`}
              keyFn={(cert) => cert.id}
              choices={certificationsRef.sort((a, b) =>
                a.certBody + a.name > b.certBody + b.name ? 1 : -1
              )}
              selectedChoice={userCertification?.Certification}
              placeholder={t("userProfile.certModal.selectCert")}
              readOnly={editMode}
              onChange={(certification) => {
                setUserCertification({
                  ...userCertification,
                  Certification: certification,
                });
              }}
              id={"select-certification"}
            />
            <div className="relative form-floating mb-3 xl:w-96">
              <label htmlFor="floatingInput" className="ml-2 mt-1 text-base">
                {!userCertification?.obtained
                  ? t("userProfile.certModal.deadline")
                  : t("userProfile.certModal.from")}
              </label>
              <input
                type="date"
                className="form-control block w-full px-3 py-1.5 border border-solid border-gray-300 rounded m-0 ml-2 mt-1 text-base bg-light-light dark:bg-dark-light"
                placeholder={t("userProfile.certModal.selectDate")}
                value={userCertification?.from}
                onChange={(evt) => {
                  setUserCertification({
                    ...userCertification,
                    from: evt.target.value,
                  });
                }}
              />
            </div>
            {userCertification?.obtained ? (
              <button
                onClick={() => {
                  setHasExpiryDate(!hasExpiryDate);
                }}
                className="flex flex-row text-left my-2"
              >
                <span className="shrink-0 my-0.5">
                  <Image
                    src={`/icons/${darkMode ? "dark" : "light"}/${
                      hasExpiryDate ? "full" : "empty"
                    }-select.svg`}
                    height={32}
                    width={32}
                    layout="fixed"
                  />
                </span>
                <span className="ml-2 mt-1 text-base">
                  {t("userProfile.certModal.hasExpiryDate")}
                </span>
              </button>
            ) : (
              <></>
            )}
            {userCertification?.obtained && hasExpiryDate ? (
              <div className="relative form-floating mb-3 xl:w-96">
                <label htmlFor="floatingInput" className="ml-2 mt-1 text-base">
                  {t("userProfile.certModal.to")}
                </label>
                <input
                  type="date"
                  className="form-control block w-full px-3 py-1.5 border border-solid border-gray-300 rounded m-0 ml-2 mt-1 text-base bg-light-light dark:bg-dark-light"
                  placeholder={t("userProfile.certModal.selectDate")}
                  value={userCertification?.to?.toString()}
                  onChange={(evt) => {
                    setUserCertification({
                      ...userCertification,
                      to: evt.target.value,
                    });
                  }}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-row justify-between">
        <button
          onClick={() => onCancel()}
          className="mx-1 px-5 py-2 bg-light-graybutton dark:bg-dark-graybutton rounded-full"
        >
          {t("userProfile.certModal.cancel")}
        </button>
        <button
          disabled={
            !userCertification?.Certification?.id || !userCertification?.from
          }
          onClick={() =>
            onConfirm({
              ...userCertification,
              obtained: !!userCertification.obtained,
              to:
                hasExpiryDate && !!userCertification.obtained
                  ? userCertification.to
                  : null,
            })
          }
          className="mx-1 px-5 py-2 gradient-red rounded-full disabled:opacity-25"
          id={"certification-confirm-button"}
        >
          {t("userProfile.certModal.confirm")}
        </button>
      </div>
    </div>
  );
};

export default CertificationModal;
