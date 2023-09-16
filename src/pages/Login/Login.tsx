import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getRules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <div className='mt-8'>
                <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 
                  focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.email?.message}</div>
              </div>

              <div className='mt-3'>
                <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 
                  focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.password?.message}</div>
              </div>

              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 
                uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng nhập
                </button>
              </div>

              <div className='mt-8 flex justify-center items-center'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link to='/register' className='text-red-400 ml-1'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
