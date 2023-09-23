import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  className?: string
  errorMessage?: string
  type: React.HTMLInputTypeAttribute
  rules?: RegisterOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  placeholder?: string
  name: string
  autoComplete?: string
}

function Input({ className, autoComplete, name, placeholder, register, rules, type, errorMessage }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-3 w-full outline-none border border-gray-300 
                  focus:border-gray-500 rounded-sm focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errorMessage}</div>
    </div>
  )
}

export default Input
