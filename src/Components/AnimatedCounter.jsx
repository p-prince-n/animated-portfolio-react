
import CountUp from 'react-countup'
import { counterItems } from '../constants'

const AnimatedCounter = () => {
  return (
    <div id='counter' className='padding-x-lg pl-2 mx-5 xl:mt-0 mt-32 ' >
        <div className="mx-auto grid-4-cols ">
            {counterItems.map((item, idx)=>(
                <div key={idx} className='bg-zinc-900 rounded-lg p-10 flex flex-col justify-center '>
                    <div className="counter-number text-white text-2xl lg:text-5xl font-bold mb-2 ">
                       <CountUp suffix={item.suffix} end={item.value} />
                    </div>
                    <div className='text-white-50 text-sm lg:text-lg ' >{item.label}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AnimatedCounter