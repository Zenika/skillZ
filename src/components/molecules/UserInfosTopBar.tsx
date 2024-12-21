import Image from 'next/image'
import { useRouter } from 'next/router'
import { config } from '../../env'

type userInfosProps = {
    userEmail: string
    userPicture: string
    userName: string
    sentence: string
}

const UserInfosTopBar = ({
    userEmail,
    userPicture,
    userName,
    sentence,
}: userInfosProps) => {
    /*
     * HOOKS
     */
    const { push } = useRouter()

    const userProfile = new URL(
        `${config.nextPublicBaseUrl}/profile/${userEmail}`
    )
    return (
        <div className="flex flex-row mb-4 p-2 w-full gradient-red  rounded">
            <Image
                className="w-16 h-16 rounded-full"
                height="64"
                width="64"
                src={userPicture}
                alt={userName}
            />
            <div className="flex flex-col mx-4 justify-center">
                <p className="opacity-70">{sentence}</p>
                <p
                    onClick={() => push(userProfile)}
                    className="uppercase hover:underline cursor-pointer"
                >
                    {userName}
                </p>
            </div>
        </div>
    )
}

export default UserInfosTopBar
