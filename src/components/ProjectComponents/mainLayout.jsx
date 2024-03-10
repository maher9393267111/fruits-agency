import React from 'react'
import Navbar from './navbar'
import Topbar from 'components/Topbar'

export default function MainLayout({children}) {
  return (
    <div className=''>
        <Topbar/>

<Navbar/>



<div>

    {children}

</div>







    </div>
  )
}
