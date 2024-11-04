import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className="container p-5">
            <center>
                <div style={{ display: 'block' }}>
                    <p>Transparency at Every Level of the Supply Chain</p>
                    <h1 className='mb-5'>Welcome to SustainChain</h1>
                    <div className="heroDiv">
                        <img className="w-25 h-25" src="media/images/SustainChain_img.avif" alt="Sustainability Image 1" />
                        <img className="w-25 h-25" src="media/images/SustainChain_img2.avif" alt="Sustainability Image 2" />
                        <img className="w-25 h-25" src="media/images/SupplyChain_img3.jpeg" alt="Sustainability Image 3" />
                    </div>
                    <br />
                    <button className='p-2 btn btn-primary fs-5 mb-5' style={{ width: "20%", margin: "0 auto" }}>
                        <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Join SustainChain</Link>
                    </button>
                </div>
            </center>
        </div>
    );
}

export default Hero;
