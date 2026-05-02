"use client"
import React from 'react'
import { RedirectToSignIn, UserProfile, useUser } from '@clerk/nextjs'



const userprofile = () => {
  const {user, isSignedIn} = useUser();

  if(!isSignedIn){
    return <p><RedirectToSignIn/></p>
  }
  return (
    <div className=' flex justify-center mt-14 items-center py-8'>
      <UserProfile path='/user-profile'/>
    </div>
  )
}

export default userprofile
