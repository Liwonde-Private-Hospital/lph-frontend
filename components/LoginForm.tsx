'use client'
import React, { useState } from 'react'
import {
  Button,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  Text
} from '@chakra-ui/react'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Image from 'next/image'
import icon from '../public/favicon.ico'
import { LPHStaffRole } from '@/app/enums'
import { login } from '@/actions'
import Link from 'next/link'

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [showEnterFieldsMessage, setShowEnterFieldsMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const toggleShowPassword = () => setShowPassword(prev => !prev)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setShowEnterFieldsMessage(false)
    setErrorMessage(null)

    if (!username || !password) {
      setShowEnterFieldsMessage(true)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Staff/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        setIsLoading(false)
        toast.error(
          errorData.message || 'Invalid username or password. Please try again.'
        )
        throw new Error(
          errorData.message || 'Invalid username or password. Please try again.'
        )
      }

      const data = await response.json()
      const userRoles = Array.isArray(data.user?.role)
        ? data.user.role
        : [data.user?.role]
      const userDepartment = findUserDepartment(userRoles)
      const fullName = `${data.user.firstName} ${data.user.lastName}`
      if (userDepartment) {
        login(fullName, userDepartment)
        toast.success(`${userDepartment} logged in successfully`)
      } else {
        throw new Error('User does not have access to assigned department.')
      }
    } catch (error) {
      setErrorMessage((error as Error).message)
      toast.error((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const findUserDepartment = (userRoles: string[]): string | undefined => {
    return Object.values(LPHStaffRole).find(role => userRoles.includes(role))
  }

  return (
    <div className='form'>
      <ToastContainer />
      <div className='form-wrapper'>
        <div className='header1'>
          <Link href='/'>
            <div className='logo-container mt-2'>
              <Image
                src={icon}
                alt='icon'
                width={100}
                height={100}
                style={{ borderRadius: '10px' }}
              />
            </div>
          </Link>
          <h1 className='text-xl font-bold mb-4 text-gray-900'>
            Staff Login Portal
          </h1>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <FaUser className='absolute right-[37rem] top-[27rem] text-green-400' />
              <Input
                type='text'
                id='username'
                placeholder='       Enter Username'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='       Enter Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div
                className='absolute cursor-pointer right-[23rem] top-[33rem]  '
                onClick={toggleShowPassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </FormControl>
            {showEnterFieldsMessage && (
              <Text color='red' mt='0.5rem'>
                Please enter both username and password.
              </Text>
            )}
            {errorMessage && (
              <Text color='red' mt='0.5rem'>
                {errorMessage}
              </Text>
            )}
            <Button
              type='submit'
              isLoading={isLoading}
              mt={4}
              className='px-6 py-3 w-full bg-green-500 hover:bg-green-400 text-white font-bold rounded'
            >
              {isLoading ? <Spinner size='md' /> : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
