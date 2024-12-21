import React, { useEffect } from 'react';
import Image from 'next/image';
import { useTutorialMode } from '../../../providers/TutorialModeProvider';
import { useQuery } from '@apollo/client';
import { GetUserSkillsIdQuery } from '../../../generated/graphql';
import { useAuth0 } from '@auth0/auth0-react';
import { GET_USER_SKILLS_ID } from '../../../graphql/queries/skills';
import { useI18n } from '../../../providers/I18nProvider';

const TutorialTopBar = () => {
    const { t } = useI18n();
    const { changeTutorialMode, tutorialMode } = useTutorialMode();
    const { user } = useAuth0();
    const { data: userSkills, refetch: refetchUserSkills } =
        useQuery<GetUserSkillsIdQuery>(GET_USER_SKILLS_ID, {
            variables: { email: user.email, fetchPolicy: 'network-only' },
        });

    useEffect(() => {
        refetchUserSkills();
        if (userSkills?.UserSkillDesire?.length === 0) {
            changeTutorialMode(true);
        }
    }, [userSkills, refetchUserSkills, changeTutorialMode]);

    return (
        <>
            {tutorialMode && (
                <div className="flex justify-between mb-4 p-2 w-full gradient-red-faded rounded">
                    <div className="flex flex-row">
                        <Image
                            className="w-16 h-16 rounded-full"
                            height="64"
                            width="64"
                            src={'/fusee.png'}
                            alt={'logoTutorial'}
                        />
                        <div className="flex flex-col mx-4 justify-center">
                            <p className="">{t('onboarding.home.welcome')}</p>
                            <p className="opacity-70">
                                {userSkills?.UserSkillDesire?.length === 0
                                    ? t('onboarding.home.remindBeginner')
                                    : t('onboarding.home.remind')}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TutorialTopBar;
