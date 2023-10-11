interface Props {
  children: React.ReactNode
  className?: string
  onClick?:
    | React.MouseEventHandler<HTMLButtonElement>
    | (undefined & React.MouseEventHandler<HTMLButtonElement>)
    | undefined
}

function Button({ className, children, onClick }: Props) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default Button
