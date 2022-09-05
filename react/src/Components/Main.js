import React from 'react';
import Card from './Card';
import { useSelector, useDispatch } from "react-redux"


const Main = () => {
    const { item, user } = useSelector(state => state.Site);
    return (
        <div className='flex flex-1 flex-wrap'>
            {
                item.map((obj, i) => {
                    let number = 0;
                            (user?.basket?.forEach(element => {
                                if(element.item_id === obj.id){
                                    number = element.number;
                                }
                            }))
                            if(user !== 0){
                                return(<Card key={i} item={obj} basket={number} money={user.user[0].money}/>)
                            }else{
                                return(<Card key={i} item={obj} basket={0}/>)
                            }
                })
            }
        </div>
    )
}

export default Main