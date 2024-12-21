import Image from 'next/image'
import React from 'react'

export const BadgeSubojectives = ({ src }) => {
    return (
        <Image
            className="object-fill h-48 w-full object-center"
            src={src}
            alt={'Badge'}
            width="35"
            height="35"
        />
    )
}
