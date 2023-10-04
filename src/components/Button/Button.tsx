interface Props {
  children: React.ReactNode
  className?: string
}

function Button({ className, children }: Props) {
  return <button className={className}>{children}</button>
}

export default Button
