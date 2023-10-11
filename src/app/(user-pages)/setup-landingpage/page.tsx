import TestFetch from '@/components/TestFetch/TestFetch'
import MainSection from '@/layouts/LandingpageLayout/MainSection'
import { NextPage } from 'next'
import React from 'react'

const Landingpage: NextPage = () => {
  return (
    <div>
        <MainSection />
        <TestFetch />
    </div>
  )
}

export default Landingpage