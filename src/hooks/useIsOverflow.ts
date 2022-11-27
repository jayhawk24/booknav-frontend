import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useIsOverflow = (ref: any, callback?: any) => {
  const [isOverflow, setIsOverflow] = React.useState<boolean | undefined>(
    undefined,
  )
  const handleResize = React.useCallback(() => {
    const { current } = ref

    const trigger = () => {
      console.log(current.scrollHeight, current.clientHeight)
      const hasOverflow = current.scrollHeight > current.clientHeight

      setIsOverflow(hasOverflow)

      if (callback) callback(hasOverflow)
    }

    if (current) {
      trigger()
    }
  }, [ref, callback])

  React.useLayoutEffect(() => {
    handleResize()
  }, [callback, ref])

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isOverflow
}
