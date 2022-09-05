import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { buy, sell } from './../Tools/dbComment';

const Card = ({item, basket, money}) => {
    const [test, setTest] = useState(false);

    useEffect(() =>{
        if(parseInt(item.price) <= parseInt(money)){
            setTest(true);
        }else{
            setTest(false);
        }
    },[money])

    function localSell(){
        if(basket > 0){
            sell(item.id);
        }
    }

    function localBuy(){
        if(parseInt(item.price) <= parseInt(money)){
            buy(item.id);
        }
    }

    return (
        <div className='rounded-2xl border-[1px] border-black h-80 w-60 ml-5 mt-5 bg-white'>
            <div className='w-full h-52 rounded-t-2xl'>
                    <img className=' w-full h-full p-1' src={require(`../img/${item.image_url}`)}/>
            </div>
            <div className=' w-full h-14 pl-2'>
                <h1 className=' text-2xl font-bold'>{item.name}</h1>
                <p>$ {item.price}</p>
            </div>
            <div className=' w-full flex justify-center mt-2'>
                {basket !== 0 ?
                <button className=' rounded-l-lg hover:bg-red-700 active:bg-red-800 bg-red-600' onClick={localSell}>Sat</button>
                :
                <button className=' rounded-l-lg bg-red-400 disabled:'>Sat</button>}
                <span className='flex justify-center items-center w-10 border-[1px] border-black font-bold'>{basket}</span>
                {test === true ? 
                <button className='rounded-r-lg hover:bg-teal-600 active:bg-teal-700 bg-teal-500' onClick={localBuy}>Satın Al</button>
                :
                <button className='rounded-r-lg  bg-teal-200 disabled'>Satın Al</button>}
            </div>
        </div>
    )
}

export default Card