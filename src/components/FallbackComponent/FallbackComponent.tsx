import React from 'react'
import { LoaderIcon } from 'react-hot-toast'

const FallbackComponent = () => {
  return (
    <div
      className={`z-50 w-full h-screen overflow-hidden flex justify-center items-center ${
        localStorage.getItem('theme') === 'dark' ? 'bg-neutral-900' : ''
      } `}
      v-if="loading"
    >
      <Loader />
    </div>
  )
}
export const Loader = ({ size = '100px' }: { size?: string }) => (
  <LoaderIcon style={{ width: size, height: size }} />
)

export default FallbackComponent
