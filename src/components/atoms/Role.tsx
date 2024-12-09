import { RoleItem } from '../../utils/types'

type RoleType = 'common' | 'selected'

type RoleProps = {
    type: RoleType
    role: RoleItem
    keyId: string | number
    readOnly?: boolean
    callback?: (role: RoleItem) => void
}

export const roleTypeClasses: Record<RoleType, string> = {
    common: 'font-bold gradient-red-faded text-light-ultrawhite hover:shadow-xl hover:shadow-light-graybutton hover:dark:shadow-lg hover:dark:shadow-dark-radargrid',
    selected:
        'text-light-dark text-light-ultrawhite gradient-red hover:drop-shadow-xl hover:dark:shadow-lg hover:dark:shadow-dark-radargrid',
}

export const roleClasses = {
    base: 'text-base font-bold py-1 px-5 rounded-full',
    disabled: 'disabled:pointer-events-none',
    variant: roleTypeClasses,
}

const Role = ({ type, role, keyId, callback, readOnly = false }: RoleProps) => {
    return (
        <div className="flex-initial py-2" key={`role-${keyId}`}>
            <button
                className={`${roleClasses.base} ${roleClasses.disabled} ${roleClasses.variant[type]}`}
                disabled={readOnly}
                onClick={() => callback(role)}
            >
                <p className="text-sm">{role.name}</p>
            </button>
        </div>
    )
}

export default Role
