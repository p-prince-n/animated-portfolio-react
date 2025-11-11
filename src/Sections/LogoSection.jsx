import React from 'react'
import { logoIconsList } from '../constants'



const LogoIcon=({imgPath, name})=>{
    return (
        <div className="flex-none flex-center marquee-item ">
            <img src={imgPath} alt={name} />
        </div>
    )
}


const LogoSection = () => {
  return (
    <div className='md:my-20 my-10 relative'>
        <div className="gradient-edge"/>
        <div className="gradient-edge"/>
        <div className="marquee h-52  ">
            <div className="marquee-box md:gap-12 gap-5  ">
                {logoIconsList.map((icon, idx)=>(
                    <LogoIcon key={idx} imgPath={icon.imgPath} name={icon.name} />
                ))}
                {logoIconsList.map((icon, idx)=>(
                    <LogoIcon key={idx} imgPath={icon.imgPath} name={icon.name} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default LogoSection