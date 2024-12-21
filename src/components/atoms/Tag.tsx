export type TagColor = 'green' | 'red' | 'blue' | 'yellow'

type TagRequiredProps = {
    color: TagColor
    name: string
    keyId: string | number
    uppercase?: boolean
}

type TagOptionalProps =
    | {
          readOnly?: false
          callback: () => void
      }
    | {
          readOnly: true
          callback?: never
      }

export type TagProps = TagRequiredProps & TagOptionalProps

export const tagColorClasses: Record<TagColor, string> = {
    green: 'gradient-green',
    red: 'gradient-red',
    blue: 'gradient-blue',
    yellow: 'gradient-yellow',
}

export const tagClasses = {
    base: 'text-base font-bold py-1 px-5 rounded-full text-light-dark text-light-ultrawhite hover:drop-shadow-xl hover:dark:shadow-lg hover:dark:shadow-dark-radargrid',
    disabled: 'disabled:pointer-events-none',
    color: tagColorClasses,
    uppercase: 'uppercase',
}

const Tag = ({
    color,
    name,
    keyId,
    readOnly,
    callback,
    uppercase = false,
}: TagProps) => {
    return (
        <div className="flex-initial py-2" key={`tag-${keyId}`}>
            <button
                className={`${tagClasses.base} ${tagClasses.disabled} ${
                    tagClasses.color[color]
                } ${uppercase && tagClasses.uppercase}`}
                disabled={readOnly}
                onClick={() => callback()}
            >
                <p className="text-sm">{name}</p>
            </button>
        </div>
    )
}

export default Tag
