'use client'
import Image from 'next/image'
import TrendsCard from './TrendsCard'
import QuickActionCard from './QuickActionCard'
import ExploreCard from './ExploreCard'
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa'
import { RxTwitterLogo } from 'react-icons/rx'
import LineChart from '@/components/charts/LineChart'
import { useState } from 'react'
import ExploreNew from './ExploreNew'
import { activePairs } from '@/utils/activePairs'
import GettingStarted from './GettingStarted'
import { FaXTwitter } from 'react-icons/fa6'
import Link from 'next/link'
import './dashboard.css';
const Dashboard = () => {
  const [showCoin, setShowCoin] = useState(false)

  const quickActions = [
    {
      name: 'Get Expert AI Trade Analysis ',
      action: 'Share Trade Details 📈',
      icon: '/CgAi/ChatAi/chartUp.png',
      color: '#1C55D5',
      path: '/CG-AI/chat/trade-analyzer/newChat',
    },
    {
      name: 'Learn how to deploy a smart contract',
      action: 'Upload A CA ⚙️',
      icon: '/CgAi/ChatAi/settings.png',
      color: '#5218FE',
      path: '/CG-AI/chat/contract-insight/newChat',
    },
    {
      name: 'Top Buzzed Coin For Today ',
      action: '',
      icon: '',
      color: '#B418FE',
      path: '/CG-AI/chat/crypto-buzz/newChat',
    },
  ]
  const exploreOptions = [
    {
      header: 'Chat Genius',
      name: `Your AI companion for mastering blockchain—ask questions, explore concepts, and expand your knowledge effortlessly`,
      availability: 'Get Started',
      path: '/CG-AI/chat/chat-genius/newChat',
    },
    {
      header: 'Trade Analyser',
      name: 'Your essential tool for deep market analysis, providing data-driven insights to guide your crypto decisions.',
      availability: 'Get Started',
      path: '/CG-AI/chat/trade-analyzer/newChat',
      // path: '#',
    },
    {
      header: 'Contract Insight',
      name: 'Analyze smart contracts for transparency. Uncover holder data, detect scams, and secure your investments',
      availability: 'Coming Soon',
      // path: '/CG-AI/chat/crypto-buzz/newChat',
      path: '#',
    },
    {
      header: 'Crypto Buzz',
      name: 'Stay updated with real-time crypto news. Track trends, market moves, and stay ahead in the blockchain world.',
      availability: 'Coming Soon',
      // path: '/CG-AI/chat/contract-insight/newChat',
      path: '#',
    },
  ]

  return (
    <div className="pageHeight flex lg:w-[94vw] w-[100vw] flex-col gap-8 overflow-hidden px-4 py-4 md:gap-16 md:px-8 md:py-16 "
      style={{
        background: `radial-gradient(circle at center, #2a1055, #1d0a41 60%, #12072d 100%)`,
        backgroundBlendMode: 'screen',
      }}>

      {/* First Blurred Layer */}
      {/* <div className='first' style={{
        position: 'absolute',
        top: '454px',
        left: '85px',
        width: '800px',
        height: '800px',
        backgroundColor: '#743FE0',
        opacity: 0.6,
        filter: 'blur(800px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: -1,
      }}></div> */}

      {/* Second Blurred Layer */}
      {/* <div className='second' style={{
        position: 'absolute',
        top: '85px',
        left: '445px',
        width: '800px',
        height: '800px',
        backgroundColor: '#743FE0',
        opacity: 0.6,
        filter: 'blur(800px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: -1,
      }}></div> */}
      <div className=" flex w-full gap-4 overflow-x-scroll scrollbar-hide" style={{
        scrollbarWidth: 'thin', // For Firefox
        paddingBottom: '10px',
      }}>
        <style jsx>{`
  /* For WebKit browsers (Chrome, Safari, Edge) */
  div::-webkit-scrollbar {
    height: 6px; /* Thickness of the scrollbar */
    background-color: #20163b; /* Darker background color for the scrollbar */
  }
  div::-webkit-scrollbar-thumb {
    background-color: #20163b; /* Darker color for the scrollbar thumb */
    border-radius: 10px; /* Rounded corners */
  }

  /* For Firefox */
  div {
    scrollbar-color: #20163b #1b1432; /* Darker shade for both thumb and track */
  }
`}</style>
        {Object.keys(activePairs).map((item, index) => (
          <TrendsCard key={index} data={activePairs[item]} path={item} />
        ))}
      </div>
      <div className="flex flex-col md:gap-4">
        <p className="text-2xl font-semibold leading-[130%] md:text-3xl">
          Getting Started
        </p>
        {/* <Image
          src="/CgAi/ChatAi/gettingStarted.png"
          width={800}
          height={800}
          alt=""
          className="w-full"
        /> */}
        <div className="noScrollbar w-full overflow-x-scroll">
          <GettingStarted />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:gap-8">
        <p className="text-2xl font-semibold leading-[130%] md:text-3xl">
          Quick Actions
        </p>
        <div className="noScrollbar flex gap-4 overflow-x-scroll mmd:justify-center mmd:overflow-auto">
          <div className="quickActionWrapper grid w-full mmd:min-w-[50rem] mmd:grid-cols-6 grid-cols-1 gap-4 min-w-0">
            {quickActions.map((item, index) => (
              <QuickActionCard
                name={item.name}
                action={item.action}
                icon={item.icon}
                color={item.color}
                key={index}
                path={item.path}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:gap-8">
        <p className="text-2xl font-semibold leading-[130%] md:text-3xl">
          Explore CG AI
        </p>
        <div className="gridWrapper flex gap-4 overflow-x-scroll mmd:justify-center mmd:overflow-auto">
          <div className="gridWrapper grid w-full grid-cols-6 gap-4 mmd:min-w-0">
            {exploreOptions.map((item, index) => (
              <ExploreCard
                name={item.name}
                header={item.header}
                path={item.path}
                key={index}
                availability={item.availability}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-4 rounded-xl bg-[#5E5AFF] px-4 py-4 md:gap-8 md:px-8 md:py-12"> */}
      <div className=" helpSectionWrapper flex flex-col gap-4 rounded-xl bg-[#5E5AFF]  md:gap-8 md:px-8 md:py-12" style={{ height: '176px', padding: "32px", fontSize: '20px', fontWeight: '700', lineHeight: '22.4px', backgroundColor: '#5E5AFF' }}>
        <p className="helpSection text-base font-semibold leading-[100%] md:text-3xl" style={{ fontSize: '20px' }}>
          Help Us Improve: Suggest a new feature or provide feedback to us
        </p>

        <div className="helpSection flex h-full w-full gap-2">
          <Link
            href="/CG-AI/suggestions"
            className="helpSectionButton flex h-12 w-full items-center justify-center rounded-lg bg-[#FDFDFD] px-2 text-center font-bold text-[#0D0D17] md:w-fit md:px-4 md:text-xl"
          >
            Suggest Feature
          </Link>
          <Link
            href="/CG-AI/suggestions"
            className=" helpSectionButton flex h-12 w-full items-center justify-center rounded-lg border px-2 text-center font-bold text-[#FDFDFD] md:w-fit md:px-4 md:text-xl"
          >
            Provide Feedback
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
