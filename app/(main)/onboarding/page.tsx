import React from 'react';
import { industries } from '@/data/industries';
import OnboardingForm from './_components/onboarding-form';
import { getUserOnBoardingStatus } from '@/actions/user';

import { redirect } from 'next/navigation';
// server -component
const OnBoardingPage = async () => {
  // check if user already on boarded
  const {isOnboarded} = await getUserOnBoardingStatus();

  if (isOnboarded) {
    console.log('user is already onboarded redirecting to dashboard')
    // redirect('/dashboard');
  }
    

  return (
    <main>
      <OnboardingForm industries = {industries} />

    </main>
  )
}

export default OnBoardingPage;
