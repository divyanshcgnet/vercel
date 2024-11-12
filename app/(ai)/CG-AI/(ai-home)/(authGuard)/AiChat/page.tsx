'use client'

import Image from 'next/image'
import './ChatAi.css';
const AiChat = () => {

    return (
        <div className='wrapper'>
            <div className='centerSection'>
                <Image
                    src="/CgAi/ChatAi/howCanIHelpYou.png"
alt='helpImage'
                    width={50}
                    height={32}
                // className="absolute -top-[60%] right-0 z-0 hidden w-full blur-2xs md:block"
                />

                How can I help you today?
            </div>
            <div className='questionsContainerWrapper'>
            <div className='questionsContainer'>How do I start crypto trading?</div>
            <div className='questionsContainer'>How do I start crypto trading?</div>
            <div className='questionsContainer'>How do I start crypto trading?</div> 
                <div className='questionsContainer'>How do I start crypto trading?</div></div>
        </div>
    )
}

export default AiChat
