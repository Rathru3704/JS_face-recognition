import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = () => {
    return(
        <div>
            <div id="viewer-container" >
                <div id="viewer" >
                    <canvas id="preview"></canvas>
                    <canvas id="annotations"></canvas>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;