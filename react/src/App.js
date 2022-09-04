import { useEffect } from 'react';
import Header from './Components/Header';
import { getItem, getUser, addMoney, removeMoney, logUp, buy, sell, logIn } from './Tools/dbComment';
import Main from './Components/Main';

function App() {
  
  useEffect(() => {
    //getItem();
    getUser(1);
    //addMoney(5);
    //removeMoney(5);

    //logUp({name:"Halil Test", surname:"Özler", username:"ha123", password:"test123"})
    //sell(34)
    //logIn({username:"1", password:"1"})
  },[])
  
  return (
    <div className='h-[100vh] w-[100vw] bg-slate-200'>
      <div className=" w-full h-16 bg-green-600 fixed">
        <div className='h-full flex justify-between items-center relative'>
          <Header/>
        </div>
      </div>
      <div className='w-[70%] h-full pt-[75px] mx-auto'>
        <Main/>
      </div>
    </div>
    
  );
}

export default App;
