import React,{ useState } from 'react'
import { addItem } from '../Tools/dbComment';


const AddItem = ({closeModel}) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");

    const onSubmit = async(e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("image", image);
        await addItem(formData);

        closeModel();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input className='inpt' placeholder='Ürün ismi' onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div>
                    <input className='inpt mt-5' type="number" placeholder='Fiyatı' onChange={(e) => {setPrice(e.target.value)}}/>
                </div>
                <div>
                    <input className='inpt mt-5' type="file" onChange={(e) => {setImage(e.target.files[0])}}/>
                </div>
                <div className='w-full'>
                    <button className='mt-5 rounded hover:bg-slate-300 active:bg-slate-500 float-right' type='submit'>Kaydet</button>
                </div>
            </form>
        </div>
    )
}

export default AddItem;