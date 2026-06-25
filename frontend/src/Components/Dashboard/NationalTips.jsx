import React from 'react'
import PigIcon from "./../../assets/Images/pigicon.png"
import DebtCardIcon from "./../../assets/Images/debtcard.png"
import HomeIcon from "./../../assets/Images/greenhome.png"
import SecurityIcon from "./../../assets/Images/security.png"
const NationalTips = () => {
    const cards=[
        {
        icon:PigIcon,
        caption:"Auto Save",
        text:"Set a goal, save automatically with National Banking's Auto Save and track your Progress."
    },
        {
        icon:DebtCardIcon,
        caption:"Budget",
        text:"Monitor your budget and keep track of your spending."
    },
        {
        icon:HomeIcon,
        caption:"Home Option",
        text:"Your home buying, refinancing, and insights all in one place."
    },
        {
        icon:SecurityIcon,
        caption:"Security Tips",
        text:"We will NEVER ask you to share your security details, such as your \"COT\" code or any sensitive account information."
    },
]
  return (
    <div className='mb-10'>
        <h1 className='border-b-[1px] border-b-slate-300 text-xs font-medium text-bankred pb-2'>National Tips</h1>
        <ul>
            {cards.map((item, index)=>(
                <li className='flex gap-5 border-b-[1px] border-b-slate-300 p-5' key={index}>
                    <div>
                        <img src={item.icon} alt={`${item.caption} icon`} className='w-20'/>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-xs font-bold'>{item.caption}</h1>
                        <p className='text-slate-400 text-bankSmall'>{item.text}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default NationalTips