import React from 'react'
import Hero from './Hero'
import PageWrapper from '../../components/PageWrapper'

const HomePage = () => {
  return (
          <PageWrapper>
               <div data-page="home">
                    <Hero />
               </div>
          </PageWrapper>
  )
}

export default HomePage;
