import { getUserOnBoardingStatus } from '@/actions/user';
import React from 'react';
import { redirect } from 'next/navigation';
import { getIndustryInsights } from '@/actions/dashboard';
import DashboardView from './_component/dashboard-view';

const IndustryInsightsPage = async () => {

    const { isOnboarded } = await getUserOnBoardingStatus();
    
      if (!isOnboarded) {
        redirect('/onboarding');
      }
    
      const insights = await getIndustryInsights( );
      


  return (
    <div className='pt-30'>
      <DashboardView insights={insights} />
    
    </div>
  )
}

export default IndustryInsightsPage
