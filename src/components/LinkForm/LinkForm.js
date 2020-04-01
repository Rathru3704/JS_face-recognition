import React from 'react';
import './LinkForm.css';

const LinkForm = ({onChange, onClick}) => {
    return(
        <div>
            <h2 className='mb4'>^  A Cat Face Recongnition  ^</h2>
            <div className="flex justify-center mv4 pa4">
                <div className='w-40-l w-70 m pv4 ph3 br3 bg-washed-red shadow-5'>
                    <input className='w-70-l w-60 pa2 bn f4' type='text' onChange={onChange} placeholder=' image address'></input>
                    <button className='w-20-l w-30 pa2 f4 i link grow bn washed-red bg-darkblue' onClick={onClick}>Meow!</button>
                </div>
            </div>
        </div>
    );
}

export default LinkForm;