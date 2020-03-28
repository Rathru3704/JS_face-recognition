import React from 'react';
import './Logo.css';
import Tilty from "react-tilty";

const Logo = () => {
    return(
        <div className="flex justify-center">
            <Tilty 
                className='tilty br-100 w4 h4 shadow-5'
                settings={{
                // glare: true,
                scale: 1.05,
                "max-glare": 0.5
            }}>
                <div className="inner i">(=^･ω･^=)</div>
            </Tilty>
        </div>
    );
}

export default Logo;