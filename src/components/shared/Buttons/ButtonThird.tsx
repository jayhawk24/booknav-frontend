import Button, { ButtonProps } from 'components/shared/Buttons/Button'
import React from 'react'

export type ButtonThirdProps = ButtonProps

const ButtonThird: React.FC<ButtonThirdProps> = ({
  className = 'text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700',
  ...args
}) => {
  return <Button className={`ttnc-ButtonThird ${className}`} {...args} />
}

export default ButtonThird
