import { InputHTMLAttributes, useState } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { EyeIcon, EyeSlashIcon } from '../Icons'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  classNameEye?: string
  rules?: RegisterOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
}

function Input({
  className,
  name,
  register,
  rules,
  errorMessage,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1rem] text-sm',
  classNameEye = 'absolute top-[8px] right-[5px] w-5 h-5 cursor-pointer',
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : null
  const [openEye, setOpenEye] = useState(false)

  const toggleEye = () => {
    setOpenEye((prev) => !prev)
  }

  const handleType = () => {
    if (rest.type === 'password') {
      return openEye ? 'text' : 'password'
    }
    return rest.type
  }

  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} type={handleType()} />
      {rest.type === 'password' && openEye && <EyeIcon className={classNameEye} onClick={toggleEye} />}

      {rest.type === 'password' && !openEye && <EyeSlashIcon className={classNameEye} onClick={toggleEye} />}

      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
