import { useFloating, FloatingPortal, arrow, shift, offset } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

import { Link } from 'react-router-dom'
import { ArrowDownIcon, CartIcon, GlobalIcon, SearchIcon, ShopeeIconLogo } from '../Icons'
import usePopover from 'src/hooks/usePopover'
import { useRef } from 'react'

function Header() {
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, refs, strategy, middlewareData } = useFloating({
    middleware: [
      offset(6),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  })
  const { open, hidePopover, showPopover } = usePopover()

  return (
    <div className='pb-5 pt-2 bg-[linear-gradient(-180deg,#f53d2d,#f63)] text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <div
            className='flex items-center  py-1 hover:text-gray-300 cursor-pointer'
            ref={refs.setReference}
            onMouseEnter={showPopover}
            onMouseLeave={hidePopover}
          >
            <GlobalIcon />
            <span className='mx-1'>Tiếng Việt</span>
            <ArrowDownIcon />
            <FloatingPortal>
              <AnimatePresence>
                {open && (
                  <motion.div
                    ref={refs.setFloating}
                    style={{
                      position: strategy,
                      left: x ?? 0,
                      top: y ?? 0,
                      width: 'max-content',
                      transformOrigin: `${middlewareData.arrow?.x}px top`
                    }}
                    initial={{ opacity: 0, transform: 'scale(0)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transform: 'scale(0)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <span
                      ref={arrowRef}
                      className='border-x-transparent border-t-transparent border-[11px] absolute border-b-white translate-y-[-95%] z-10'
                      style={{
                        left: middlewareData.arrow?.x,
                        top: middlewareData.arrow?.y
                      }}
                    />
                    <div className='relative bg-white shadow-md rounded-sm border border-gray-200'>
                      <div className='flex flex-col py-2 px-3'>
                        <button className='py-2 px-3 hover:text-orange'>Tiếng Việt</button>
                        <button className='py-2 px-3 hover:text-orange'>English</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </FloatingPortal>
          </div>
          <div className='flex items-center  py-1 hover:text-gray-300 cursor-pointer ml-6'>
            <div className='w-5 h-5 mr-2 flex-shrink-0'>
              <img
                src='https://down-vn.img.susercontent.com/file/vn-11134004-7r98o-lm70dawd3g7zd8_tn'
                alt='avatar'
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <div>vovykhang</div>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4 mt-4 items-end'>
          <Link to='/' className='col-span-2'>
            <ShopeeIconLogo />
          </Link>
          <form className='col-span-9'>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                type='text'
                name='search'
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                placeholder='FREESHIP ĐƠN TỪ 0Đ'
              />
              <button className='rounded-sm py-2 px-6 flex-shrink-0 bg-orange hover:opacity-90'>
                <SearchIcon />
              </button>
            </div>
          </form>
          <div className='col-span-1 justify-self-end align-bottom'>
            <Link to='' className='rounded-sm text-white hover:bg-opacity-90'>
              <CartIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
