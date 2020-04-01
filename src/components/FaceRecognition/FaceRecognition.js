import React from 'react';

const FaceRecognition = ({imgUrl}) => {
    return(
        <div>
           <img className='w-30-l w-60-m mb5' src={imgUrl} alt='cat'></img>
        </div>
    );
}

export default FaceRecognition;