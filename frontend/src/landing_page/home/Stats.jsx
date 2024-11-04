import React from 'react';

function Stats() {
    return ( 
        <div className="container">
            <div className="row">
                <div className="col-6 p-5">
                    <h1 className='fs-2 mb-4'>Empowering Ethical Choices in Supply Chains</h1>

                    <h3 className='fs-4'>Transparency and Accountability</h3>
                    <p className='text-muted'>
                       We provide clear, data-driven insights into manufacturers' sustainability and ethical practices, enabling conscious choices.
                    </p>

                    <h3 className='fs-4'>Reliable Sustainability Scores</h3>
                    <p className='text-muted'>
                        Our scoring system ensures a transparent view into a manufacturer's environmental and ethical standards.
                    </p>

                    <h3 className='fs-4'>Supporting Ethical Businesses</h3>
                    <p className='text-muted'>
                        Our platform helps ethical manufacturers reach consumers who value sustainability, fostering responsible production.
                    </p>

                    <h3 className='fs-4'>Guiding You Towards Better Choices</h3>
                    <p className='text-muted'>
                        We go beyond scores—our goal is to create a movement toward sustainability in every step of the supply chain.
                    </p>
                </div>
                
                <div className="col-6 p-5">
                    <img src="media/images/confident-career-2.jpg" alt="Hiring Ecosystem" style={{width: "500px"}}/>
                </div>
            </div>
        </div>
    );
}

export default Stats;
