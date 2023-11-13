import { InputHTMLAttributes, useState } from 'react'
import { UseControllerProps, useController, FieldValues, FieldPath } from 'react-hook-form'

export type InputV2Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputV2Props<TFieldValues, TName>) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1rem] text-sm',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFormInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFormInput) || valueFormInput === '')
    if (numberCondition || type !== 'number') {
      // Update local value
      setLocalValue(valueFormInput)
      //Call field.onChange to update to state React Hook Form
      field.onChange(event)
      // Excuse onChange callback from props
      onChange && onChange(event)
    }
  }

  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...field} onChange={handleChange} value={value || localValue} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2

// type Gen<TFUNC> = {
//   getName: TFUNC
// }

// function Hexa<TFunc extends () => string, TLastName extends ReturnType<TFunc>>(props: {
//   person: Gen<TFunc>
//   lastName: TLastName
// }) {
//   return null
// }

// const handleGetName: () => 'abc' = () => 'abc'

// function App() {
//   return <Hexa person={{ getName: handleGetName }} lastName='' />
// }
