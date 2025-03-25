import React from 'react'

const MainLayout =async ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
    // Redirect user to onboarding page if logged in 
  return (
    <div className='container mx-auto mt-20 mb-20'>
      {children}
    </div>
  )
}

export default MainLayout
