import { useState } from 'react'

function usePopover() {
  const [open, setOpen] = useState(false)

  const showPopover = () => {
    setOpen(true)
  }

  const hidePopover = () => {
    setOpen(false)
  }

  return {
    open,
    showPopover,
    hidePopover
  }
}

export default usePopover
