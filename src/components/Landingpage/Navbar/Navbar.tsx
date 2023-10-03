import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div>
        <Image
            src="/kinoxp-logo-text.png"
            height={80}
            width={200}
            alt="logo"
            />

    </div>
  )
}

export default Navbar