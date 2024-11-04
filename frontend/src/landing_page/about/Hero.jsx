import React from "react";

function Hero() {
  return (
    <div className="container mt-5">
      <div className="ml-5 text-center">
        <h1>
          Empowering transparency in supply chains. <br />
          Enabling ethical decisions for a sustainable future.
        </h1>
        <img src="media/images/connecting.png" alt="Connecting" className="w-50"/>
      </div>

      <div className="row p-5 mt-5 border-top text-muted" style={{lineHeight: "1.7", fontSize: "1.1em"}}>
        <div className="col-1"></div>
        <div className="col-5 p-5">
          <p>
            SustainChain was founded with a vision to foster transparency in supply chains, helping companies 
            make ethical choices by providing actionable insights into manufacturers' sustainability practices.
          </p>

          <p>
            Today, SustainChain connects companies with verified data, promoting responsible sourcing and 
            informed decision-making for a greener future.
          </p>

          <p>
            Businesses and consumers alike depend on SustainChain daily to evaluate their supply chains, 
            encouraging sustainable practices worldwide.
          </p>
        </div>
        <div className="col-5 p-5">
          <p>
            Beyond transparency, our platform offers guidance and resources to help businesses improve their sustainability 
            score, with a focus on ethical labor practices and environmental impact.
          </p>

          <p>
            <a href="" style={{textDecoration: "none"}}>Discover our solutions</a> and see how we empower companies 
            to champion ethical supply chains.
          </p>

          <p>
            Follow our blog to stay updated on sustainability trends, or explore testimonials to see how SustainChain 
            supports companies in making responsible choices.
          </p>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}

export default Hero;
