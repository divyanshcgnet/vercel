import { FaArrowRight } from 'react-icons/fa6'
import Link from 'next/link'
import './dashboard.css';

interface IExploreCard {
  name: string
  header: string
  availability: string
  path: string
}
const ExploreCard = ({ name, header, availability, path }: IExploreCard) => {
  return (
    <div className={`exploreCard col-span-6 flex cursor-pointer flex-col justify-between gap-4 rounded-2xl bg-[#202034] p-7 md:col-span-3 md:p-8`} style={{ padding: '1px', background: 'linear-gradient(0deg, rgba(188, 188, 188, 0.07), rgba(188, 188, 188, 0.07)), linear-gradient(99.51deg, rgba(188, 188, 188, 0.3) 0%, rgba(102, 102, 102, 0) 64.42%)' }}>
      <Link
        href={path}
        className={`exploreCard col-span-6 flex cursor-pointer flex-col justify-between gap-4 rounded-2xl bg-[#202034] p-6 md:col-span-3 md:p-8`}
        // style={{
        //   borderWidth: '1px',
        //   borderImageSource: 'linear-gradient(0deg, rgba(188, 188, 188, 0.07), rgba(188, 188, 188, 0.07)), linear-gradient(99.51deg, rgba(188, 188, 188, 0.3) 0%, rgba(102, 102, 102, 0) 64.42%)',
        //   borderImageSlice: 1,
        //   borderImageWidth: '1px', // This may also be necessary for proper rendering
        // }}
      >
        <div className="mobileTextButton flex w-fit items-center rounded-full border-2 border-[#6754F8] bg-black px-4 text-sm font-medium leading-6 shadow-lg shadow-white/5">
          {header}
        </div>
        <p className="mobileText  md:mt-0 text-2xl font-semibold text-white/80 ">{name}</p>
        <div className=" mobileTextContainer  mt-0  flex items-center gap-2">
          <p className="  gettingStartedText  text-xl font-semibold text-[#A5A3FF]">{availability}</p>
          <FaArrowRight className="text-[#A5A3FF]" />
        </div>
      </Link>
    </div>
  )
}

export default ExploreCard
