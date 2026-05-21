import React from 'react';
import About from './About';
import Predicas from './Predicas';
import Actividades from './Actividades';
import Loading from './Loading';
import Actindividual from './Actindividual';
import Hero from './Hero';

const HomeContainer = () => {
  try {
    return (
      <div>
        <Hero />
        <About />
        <div id="actividades" className="scroll-mt-[72px]"><Actindividual /></div>
        <Actividades isCarousel={true} />
        <div id="predicas" className="scroll-mt-[72px]"><Predicas isCarousel={true} /></div>
      </div>
    );
  } catch (error) {
    return <Loading />;
  }
};

export default HomeContainer;