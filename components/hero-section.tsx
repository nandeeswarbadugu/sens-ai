import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {
    return (
        <section className='w-full pt-36 md:pt-48 pb-10'>
            <div className='space-y-6'>
                <div className='text-center'>
                    <h1 className='text-5xl pb-5'>
                        Your AI Career Coach for
                        <br />
                        Professional Success
                    </h1>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                        Advance your career with personalized guidance, interview prep, and
                        AI-powered tools for job success.
                    </p>
                </div>

                <div className='text-center space-x-4'>
                    <Link href="/dashboard">
                        <Button size="lg" className='px-8'>
                            Get Started
                        </Button>
                    </Link>
                    <Link href="https://www.youtube.com/roadsidecoder">
                        <Button size="lg" variant="outline" className="px-8">
                            Watch Demo
                        </Button>
                    </Link>
                </div>
                <div>
                    <div>
                        <Image src='/banner.jpeg'
                         width={1280}
                         height={720}
                         alt="Dashboard Preview"
                         className="rounded-lg shadow-2xl border mx-auto"
                         priority
                        />

                    </div>
                </div>
            </div>

        </section>
    )
}

export default HeroSection
