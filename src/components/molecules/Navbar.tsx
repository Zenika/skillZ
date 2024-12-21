import { useQuery } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import { GetAllNotVerifiedSkillsQuery } from '../../generated/graphql'
import { GET_ALL_NOT_VERIFIED_SKILL } from '../../graphql/queries/skills'
import { useDarkMode } from '../../providers/DarkModeProvider'
import { useI18n } from '../../providers/I18nProvider'
import { useAdmin } from '../../providers/AdminProvider'

const Navbar = () => {
    const { t } = useI18n()
    const { darkMode } = useDarkMode()
    const { pathname } = useRouter()
    const { isAdmin } = useAdmin()

    const { data: skills, error: errorSkills } =
        useQuery<GetAllNotVerifiedSkillsQuery>(GET_ALL_NOT_VERIFIED_SKILL, {
            fetchPolicy: 'network-only',
        })

    const isDesktop = useMediaQuery({
        query: '(min-device-width: 1280px)',
    })

    const numberOfNotifications =
        !errorSkills && skills ? (
            <div className="inline-flex justify-center items-center w-5 h-5 text-xs font-bold text-light-ultrawhite bg-dark-red rounded-full dark:border-gray-900">
                {skills.Skill.length}
            </div>
        ) : null

    return (
        <header className="p-2 z-50 flex flex-auto flex-row justify-evenly h-16 bg-red-800 bg-light-light dark:bg-dark-dark text-light-graytext dark:text-dark-graytext inset-x-0 bottom-0 overflow-hidden fixed shadow-2xl">
            <Link
                href="/"
                className="flex flex-initial flex-col justify-between cursor-pointer items-center"
            >
                {pathname === '/' ? (
                    <Image
                        src={`/icons/${darkMode ? 'dark' : 'light'}/nav-selected.svg`}
                        alt={'Line'}
                        width="25"
                        height="2"
                    />
                ) : (
                    <div className="h-px" />
                )}
                <Image
                    src={
                        pathname === '/'
                            ? `/icons/${darkMode ? 'dark' : 'light'}/skills-selected.svg`
                            : `/icons/${darkMode ? 'dark' : 'light'}/skills.svg`
                    }
                    alt={'Line'}
                    width="25"
                    height="25"
                    className="p-1"
                />
                <span className="text-center">{t('nav.mySkills')}</span>
            </Link>
            <Link
                href="/zenika"
                className="flex flex-initial flex-col justify-between cursor-pointer items-center"
            >
                {pathname === '/zenika' ? (
                    <Image
                        src={`/icons/${darkMode ? 'dark' : 'light'}/nav-selected.svg`}
                        alt={'Line'}
                        width="25"
                        height="2"
                    />
                ) : (
                    <div className="h-px" />
                )}
                <Image
                    src={
                        pathname === '/zenika'
                            ? `/icons/${darkMode ? 'dark' : 'light'}/zenika-selected.svg`
                            : `/icons/${darkMode ? 'dark' : 'light'}/zenika.svg`
                    }
                    alt={'Line'}
                    width="25"
                    height="25"
                    className="p-1"
                />
                <span className="text-center">{t('nav.zenikaSkills')}</span>
            </Link>
            <Link
                href="/search"
                className="flex flex-initial flex-col justify-between cursor-pointer items-center"
            >
                {pathname === '/search' ? (
                    <Image
                        src={`/icons/${darkMode ? 'dark' : 'light'}/nav-selected.svg`}
                        alt={'Line'}
                        width="25"
                        height="2"
                    />
                ) : (
                    <div className="h-px" />
                )}
                <Image
                    src={
                        pathname === '/search'
                            ? `/icons/${darkMode ? 'dark' : 'light'}/search-selected.svg`
                            : `/icons/${darkMode ? 'dark' : 'light'}/search.svg`
                    }
                    alt={'Line'}
                    width="25"
                    height="25"
                    className="p-1"
                />
                <span className="text-center">{t('nav.search')}</span>
            </Link>
            {isAdmin && (
                <Link
                    href="/admin/skills"
                    className="flex flex-initial flex-col justify-between cursor-pointer relative items-center"
                >
                    {isDesktop ? (
                        <>
                            <Image
                                src={
                                    pathname.startsWith('/admin')
                                        ? `/icons/${
                                              darkMode ? 'dark' : 'light'
                                          }/zenika-selected.svg`
                                        : `/icons/${darkMode ? 'dark' : 'light'}/zenika.svg`
                                }
                                alt={'admin'}
                                width="25"
                                height="25"
                                className="p-1"
                            />
                            <div className={'absolute top-0 right-5'}>
                                {numberOfNotifications}
                            </div>
                        </>
                    ) : (
                        <>{numberOfNotifications}</>
                    )}
                    <span className="text-center">Admin</span>
                    {pathname.startsWith('/admin') && (
                        <div className="flex flex-row justify-center w-full h-0.5">
                            <div className="w-3/4 h-full gradient-red" />
                        </div>
                    )}
                </Link>
            )}
        </header>
    )
}

export default Navbar
