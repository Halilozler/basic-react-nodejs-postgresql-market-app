import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { deleteUser } from '../Store/Site';
import { addMoney, logIn } from './../Tools/dbComment';
import AddItem from './AddItem';

import ReactDOM from 'react-dom';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        },
    };

const Header = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [money, setMoney] = useState(0);

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const { user } = useSelector(state => state.Site);
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault();
        if(username != "" && password != ""){
            logIn({username: username, password: password});
        }
    }

    const onSubmit_money = (e) => {
        e.preventDefault();
        if(money != 0 ){
            addMoney(money);
        }
    }

    function openModal() {
        setIsOpen(true);
    }
    
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>     
            {user === 0 ?
                <div className='flex pl-5'> 
                    <div className='group relative'>
                        <button className='btn'>Giriş Yap</button>
                        <div tabindex="0" class="opacity-0 invisible absolute z-[3] top-full w-44 rounded p-1 space-y-1 bg-slate-400 group-focus-within:mt-1 group-focus-within:opacity-100 group-focus-within:visible transition-all ">
                            <div className='w-fıll flex justify-center'>
                                <h3>Giriş yap</h3>
                            </div>
                            <form onSubmit={onSubmit}>
                                <div className='flex items-center'>
                                    <h6 className='text-xs'>Username: </h6> 
                                    <input className=' w-24 rounded ml-2' onChange={(e) => setUsername(e.target.value)}></input>
                                </div>
                                <div className='flex items-center mt-2'>
                                    <h6 className='text-xs'>password: </h6> 
                                    <input className=' w-24 rounded ml-[10px]' onChange={(e) => setPassword(e.target.value)}></input>
                                </div>
                                <div className='relative w-full'>
                                    <button className='btn h-6 mt-3 '>Giriş Yap</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                    
                    <div className='group relative'>
                        <button className='btn ml-3'>Üye Ol</button>
                        <div tabindex="0" class="opacity-0 invisible absolute z-[3] top-full w-44 rounded p-1 space-y-1 bg-slate-400 group-focus-within:mt-1 group-focus-within:opacity-100 group-focus-within:visible transition-all ">
                            {/* Üye Ol */}
                        </div>
                    </div>
                </div> 
            :
            <>
                <div className='pl-5'>
                    <button className='btn' onClick={() => dispatch(deleteUser())}>Çıkış Yap</button>
                </div>
                <div>
                    <h1 className=' text-xl'>Paranız <span className='font-bold'>${user.user[0].money}</span></h1>
                </div>
                <div className='flex pr-5'>
                    <div className='group relative'>
                        <button className='btn mr-3'>Para Ekle</button>
                        <div tabindex="0" class="opacity-0 invisible absolute z-[3] top-full w-40 rounded p-1 space-y-1 bg-slate-400 group-focus-within:mt-1 group-focus-within:opacity-100 group-focus-within:visible transition-all ">
                            <form onSubmit={onSubmit_money}>
                                <div className='flex items-center'>
                                    <h6 className='text-xs'>Miktar: </h6> 
                                    <input className=' w-24 rounded ml-2' onChange={(e) => setMoney(e.target.value)}></input>
                                </div>
                                <div className='relative w-full'>
                                    <button className='btn h-6 mt-3'>Ekle</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <button className='btn' onClick={openModal}>Ürün Ekle</button>
                </div>
            </>
            }

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
        >
            <AddItem closeModel={closeModal}/>
        </Modal>
        </>
    )
}

export default Header