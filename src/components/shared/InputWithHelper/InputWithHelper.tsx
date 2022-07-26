import React, { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string
  fontClass?: string
  rounded?: string
  className?: string
  helperText?: string
  helperTextColorClass?: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
}

const InputWithHelper = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      sizeClass = 'h-11 px-4 py-3',
      fontClass = 'text-sm font-normal',
      rounded = 'rounded-2xl',
      type = 'text',
      helperTextColorClass = 'text-red-600',
      helperText,
      ...args
    },
    ref,
  ) => {
    return (
      <>
        <input
          ref={ref}
          type={type}
          className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className}`}
          {...args}
        />
        {helperText && (
          <span className={`${helperTextColorClass} text-xs italic`}>
            {helperText}
          </span>
        )}
      </>
    )
  },
)

InputWithHelper.displayName = 'Input With Helper'

export default InputWithHelper
