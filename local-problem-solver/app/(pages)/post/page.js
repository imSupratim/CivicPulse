"use client"
import React from 'react'
import PostForm from '../../../components/PostForm'
import { RedirectToSignIn, useUser } from '@clerk/nextjs'


const page = () => {
  const {user} = useUser();

  if(!user){
    return <p>{<RedirectToSignIn/>}</p>
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <PostForm />
    </div>
  )
}

export default page
