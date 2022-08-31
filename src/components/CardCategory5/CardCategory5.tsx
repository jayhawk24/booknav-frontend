import React, { FC } from 'react'
import NcImage from 'components/shared/NcImage/NcImage'
import { Link } from 'react-router-dom'
import { BoatType } from 'hooks/useBoatTypes'

export interface CardCategory5Props {
  className?: string
  taxonomy: BoatType
}

const CardCategory5: FC<CardCategory5Props> = ({
  className = '',
  taxonomy,
}) => {
  const { _id, title, image } = taxonomy
  return (
    <Link
      to={`/search?typeId=${_id}&cityName=the World`}
      className={`nc-CardCategory5 flex flex-col ${className}`}
      data-nc-id="CardCategory5"
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group`}
      >
        <NcImage
          src={image}
          className="object-cover w-full h-full rounded-2xl"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 px-3 truncate">
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
        >
          {title}
        </h2>
        {/* {total && (
          <span
            className={`block mt-2 text-sm text-neutral-6000 dark:text-neutral-400`}
          >
            {convertNumbThousand(total)} boat{total > 1 ? 's' : ''}
          </span>
        )} */}
      </div>
    </Link>
  )
}

export default CardCategory5
