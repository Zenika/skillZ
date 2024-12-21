import { useRouter } from 'next/router';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { config } from '../../env';
import { Certification } from '../../utils/types';

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
                className={`flex flex-row bg-light-light dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg items-center border border-light-light dark:border-dark-light`}
            >
                <div className={`flex flex-col w-full`}>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <h2 className="text-xl">{name}</h2>
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-row items-center justify-around rounded-full w-16 px-1 py-1 bg-light-med dark:bg-dark-med h-8 cursor-pointer hover:bg-light-dark hover:border-light-graybutton hover:dark:bg-dark-radargrid hover:dark:border-dark-graybutton"
                    onClick={(e) => {
                        e.stopPropagation();
                        push(linkToCertification);
                    }}
                >
                    <span>
                        {
                            certification.UserCertifications_aggregate.aggregate
                                .count
                        }
                    </span>
                    <BsFillPersonCheckFill />
                </div>
            </div>
        </>
    );
};

export default CertificationPanel;
