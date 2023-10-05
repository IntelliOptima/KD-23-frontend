import Footer from '@/components/Landingpage/Footer/Footer'
import HeaderSection from '@/layouts/SetupLandingpageLayout/HeaderSection'
import MainSection from '@/layouts/SetupLandingpageLayout/MainSection'
import { NextPage } from 'next'
import React from 'react'

const SetupLandingpage:NextPage = () => {
  return (
    <div>
        <HeaderSection />
        <MainSection />
        <Footer />

    </div>
  )
}

export default SetupLandingpage