import Image from 'next/image'
import './dashboard.css';
export default function GettingStarted() {
  return (
    <div className=" wrapper mmd:min-w-[41rem] grid mmd:grid-cols-3 grid-cols-1 gap-4 pt-8 xl:gap-20 overflow-hidden">
      
      <div className=" cards relative flex min-w-[30%] flex-col gap-2 rounded-xl border-2 border-white/40 p-4" style={{
        backgroundColor: 'rgba(19, 23, 34, 0.2)',
      }} >
        
        <span className=" step text-sm text-themeBorderBlue md:text-base">
          Step 1:
        </span>
        <div className=" mobileText font-semibold mmd:text-lg lg:text-xl xl:text-2xl" style={{
          fontFamily: 'DM Sans',
          fontSize: '20px',
          fontWeight: 700,
          lineHeight: '28.36px',
          textAlign: 'left',
        }}>
          {/* <span className="mobileText block md:hidden">
            Get Started with AI <br />tools
          </span> */}
          <span className="mobileText">
            Get Started with AI tools
          </span>
          {/* Get Started with AI <br />tools */}
        </div>
        <Image
          src="/Homepage/AiSection/ai-sec.png"
          width={523}
          height={374}
          className="absolute -top-4 right-0 h-8 w-fit -rotate-[16deg] object-contain md:h-12"
          alt=""
        />
      </div>
      <div className="cards relative flex min-w-[30%] flex-col gap-2 rounded-xl border-2 border-white/40 p-4" style={{
        backgroundColor: 'rgba(19, 23, 34, 0.2)',
      }}>
        <span className="step text-sm text-themeBorderBlue md:text-base">
          Step 2:
        </span>
        <div className="mobileText font-semibold mmd:text-lg lg:text-xl xl:text-2xl" style={{
          fontFamily: 'DM Sans',
          fontSize: '20px',
          fontWeight: 700,
          lineHeight: '28.36px',
          textAlign: 'left',
        }}>
          <span className="mobileText ">
          Enhance Your Web3.0 Skills
          </span>
          {/* <span >
          Enhance Your Web3.0 Skills
          </span> */}
          {/* Enhance Your Web3.0<br />Skills */}
        </div>
        <Image
          src="/CgAi/ChatAi/512.png"
          width={300}
          height={298}
          className="absolute -top-8 right-0 h-16 w-fit -rotate-[16deg] object-contain md:h-20"
          alt=""
        />
      </div>
      <div className="cards relative flex min-w-[30%] flex-col gap-2 rounded-xl border-2 border-white/40 p-4" style={{
        backgroundColor: 'rgba(19, 23, 34, 0.2)',
      }}>
        <span className="step text-sm text-themeBorderBlue md:text-base">
          Step 3:
        </span>
        <div className="mobileText font-semibold mmd:text-lg lg:text-xl xl:text-2xl" style={{
          fontFamily: 'DM Sans',
          fontSize: '20px',
          fontWeight: 700,
          lineHeight: '28.36px',
          textAlign: 'left',
        }}>
        <span className=" mobileText ">
        Dominate the   Blockchain world
        </span>
        {/* <span className="hidden md:block">
        Dominate the Blockchain world
        </span> */}
          {/* Dominate the <br />  Blockchain world */}
        </div>
        <Image
          src="/CgAi/ChatAi/513.png"
          width={300}
          height={295}
          className="absolute -top-8 right-0 h-16 w-fit -rotate-[16deg] object-contain md:h-20"
          alt=""
        />
      </div>
    </div>
  )
}