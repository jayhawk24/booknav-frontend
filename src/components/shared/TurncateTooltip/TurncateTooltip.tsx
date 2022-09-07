import React from 'react'
import ReactTooltip from 'react-tooltip'
import shortenString from 'utils/shortenString'

type Props = {
  id: string
  content: string
  maxLength?: number
  place?: 'top' | 'bottom'
}

const TurncateTooltip = ({
  id,
  content,
  maxLength = 20,
  place = 'top',
}: Props) => {
  if (content.length <= maxLength) {
    return <>{content}</>
  }

  return (
    <div>
      <div data-tip data-for={id}>
        {shortenString(content, maxLength)}
      </div>
      <ReactTooltip
        className="tooltip"
        id={id}
        effect="solid"
        place={place}
        multiline={true}
        type={localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'}
      >
        <span>{content}</span>
      </ReactTooltip>
    </div>
  )
}

export default TurncateTooltip
