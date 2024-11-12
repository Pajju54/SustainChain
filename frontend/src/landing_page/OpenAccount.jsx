import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
    return ( 
        <div className="container p-5">
            <div className="col text-center">
                <h1 className='mb-4'>Open a SustainChain Account</h1>
                <p className='mb-4'>A modern platform for transparency and ethical choices!</p>
                <Link to="/signup" style={{color: 'white', textDecoration: 'none'}}><button className='p-2 btn btn-primary fs-5 mb-5' style={{width: "20%", margin: "0 auto"}}>
                    Join Now
                </button></Link>
            </div>
        </div>
     );
}

export default OpenAccount;
