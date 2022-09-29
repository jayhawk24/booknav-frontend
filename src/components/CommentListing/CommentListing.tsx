import React, { FC } from 'react'
import Avatar from 'components/shared/Avatar/Avatar'
import { StarIcon } from '@heroicons/react/solid'
import { Review } from 'services/addBoat'
import moment from 'moment'

export interface CommentListingProps {
  className?: string
  hasListingTitle?: boolean
  review: Review
}

const CommentListing: FC<CommentListingProps> = ({
  className = '',
  hasListingTitle,
  review,
}) => {

  return (
    <div
      className={`nc-CommentListing flex space-x-4 ${className}`}
      data-nc-id="CommentListing"
    >
      <div className="pt-0.5">
        <Avatar
          sizeClass="h-10 w-10 text-lg"
          radius="rounded-full"
          userName={review?.user?.title}
          imgUrl={review?.user?.picture}
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between space-x-3">
          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              <span>{review?.user?.title}</span>
              {hasListingTitle && (
                <>
                  <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                    {` review in `}
                  </span>
                  <a href="/">The Lounge & Bar</a>
                </>
              )}
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {moment(review?.createdAt).format('MMMM Do YYYY')}
            </span>
          </div>
          <div className="flex text-yellow-500">
            {Array(review?.rating)
              .fill(0)
              .map((_, i) => (
                <StarIcon key={i} className="h-5 w-5" />
              ))}
          </div>
        </div>
        <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
          {review?.comment}
        </span>
      </div>
    </div>
  )
}

export default CommentListing
