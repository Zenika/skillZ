import { UserCertification } from '../../utils/types'
import Button from '../atoms/Button'
import { useI18n } from '../../providers/I18nProvider'

type CertificationsList = {
    userCertifications: UserCertification[]
    readOnly: boolean
    onUserCertificationSelect?
    onUserCertificationAdd?
}

const CertificationsList = ({
    userCertifications,
    readOnly,
    onUserCertificationSelect = () => {},
    onUserCertificationAdd = () => {},
}: CertificationsList) => {
    const { t } = useI18n()

    return (
        <div className="flex flex-col rounded lg bg-light-dark dark:bg-dark-dark my-2 p-2">
            <span className="text-xl p-2">
                {t('userProfile.certifications')}
            </span>
            <div className="flex flex-row flex-wrap justify-around">
                {/* TODO: Custom component for certification tag*/}
                {userCertifications?.map((userCert) => (
                    <button
                        disabled={readOnly}
                        key={userCert.Certification.name + userCert.from}
                        className={`rounded-md m-2 gradient-red${
                            userCert.obtained ? '' : '-faded'
                        } ${readOnly ? 'cursor-default' : ''}`}
                        onClick={() => onUserCertificationSelect(userCert)}
                    >
                        <span className="px-2 py-1 text-white">{`${userCert.Certification.certBody} - ${userCert.Certification.name}`}</span>
                        <br />
                        <span className="px-2 py-1 text-white">{`${
                            userCert.obtained
                                ? t('userProfile.validFrom')
                                : t('userProfile.targeting')
                        } ${userCert.from} ${
                            userCert.to
                                ? ` ${t('userProfile.validTo')} ${userCert.to}`
                                : ''
                        }`}</span>
                    </button>
                ))}
            </div>
            <div className={'flex flex-row justify-center mt-2 mb-2'}>
                {!readOnly && (
                    <Button type={'primary'} callback={onUserCertificationAdd}>
                        {t('myProfile.addCertification')}
                    </Button>
                )}
            </div>
        </div>
    )
}
export default CertificationsList
