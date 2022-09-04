import React from 'react'

const Card = () => {
    return (
        <div className='rounded-2xl border-[1px] border-black h-80 w-60 ml-5 mt-5 bg-white'>
            <div className='bg-black w-full h-52 rounded-t-2xl'>

            </div>
            <div className=' w-full h-14 pl-2'>
                <h1 className=' text-2xl font-bold'>sadasd</h1>
                <p>$ 0.5</p>
            </div>
            <div className=' w-full flex justify-center mt-2'>
                <button className=' rounded-l-lg hover:bg-slate-400 active:bg-slate-500'>Sat</button>
                <span className='flex justify-center items-center w-10 border-[1px] border-black font-bold'>0</span>
                <button className='rounded-r-lg hover:bg-slate-400 active:bg-slate-500'>Satın Al</button>
            </div>
        </div>
    )
}

export default Card