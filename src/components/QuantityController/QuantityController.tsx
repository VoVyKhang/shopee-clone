import { useState } from 'react'
import { MinusIcon, PlusIcon } from '../Icons'
import { InputNumber, InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}

function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  classNameWrapper = 'ml-10',
  value,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value) || 0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
    setLocalValue(_value)
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }

    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }

    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  return (
    <div className={`flex items-center ${classNameWrapper}`}>
      <button
        className='flex items-center h-8 w-8 justify-center rounded-l-sm border border-gray-300'
        onClick={decrease}
      >
        <MinusIcon className='w-4 h-4' />
      </button>
      <InputNumber
        value={value || localValue}
        className=''
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        classNameError='hidden'
        onChange={handleChange}
        {...rest}
      />
      <button
        className='flex items-center h-8 w-8 justify-center rounded-r-sm border border-gray-300'
        onClick={increase}
      >
        <PlusIcon className='w-4 h-4' />
      </button>
    </div>
  )
}

export default QuantityController
