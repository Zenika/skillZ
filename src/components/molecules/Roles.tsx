import { RiErrorWarningFill } from 'react-icons/ri'
import { useI18n } from '../../providers/I18nProvider'
import { RoleItem } from '../../utils/types'
import Role from '../atoms/Role'

type RolesProps = {
    roles: RoleItem[]
    selectedRoles: string[]
    title: string
    error?: boolean
    readOnly?: boolean
    addCallback?: (topic: RoleItem) => void
    removeCallback?: (topic: RoleItem) => void
}

const Roles = ({
    roles,
    selectedRoles,
    error,
    title,
    addCallback,
    removeCallback,
    readOnly = false,
}: RolesProps) => {
    const { t } = useI18n()

    return (
        <div
            className={`flex flex-col rounded-lg dark:bg-dark-dark bg-light-dark my-2 p-2`}
        >
            <div className="flex flex-row">
                <p className="text-xl p-2">{title}</p>
                {error && (
                    <div className="flex flex-row items-center">
                        <RiErrorWarningFill color="#bf1d67" />
                        <p className="text-light-red pl-1">
                            {t('error.roleRequired')}
                        </p>
                    </div>
                )}
            </div>
            <div className="flex flex-row flex-wrap justify-around px-4">
                {roles.map((role, key) => {
                    const selected = selectedRoles.some((t) => role.id === t)
                    return (
                        <Role
                            role={role}
                            key={key}
                            keyId={key}
                            type={selected ? 'selected' : 'common'}
                            callback={
                                selected
                                    ? () => removeCallback(role)
                                    : () => addCallback(role)
                            }
                            readOnly={readOnly}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Roles
