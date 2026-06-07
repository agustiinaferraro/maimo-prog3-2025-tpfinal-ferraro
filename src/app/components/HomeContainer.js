import React from 'react';
import About from './About';
import Predicas from './Predicas';
import Actividades from './Actividades';
import Loading from './Loading';
import Actindividual from './Actindividual';
import Hero from './Hero';
import Reels from './Reels';

const HomeContainer = () => {
  try {
    return (
      <div>
        <Hero />
        <About />
        <div id="actividades" className="scroll-mt-[72px]"><Actividades isCarousel={true} /></div>
        <div id="reels" className="scroll-mt-[72px]"><Reels isCarousel={true} /></div>
        <Actindividual />
        <div id="predicas" className="scroll-mt-[72px]"><Predicas isCarousel={true} /></div>
      </div>
    );
  } catch (error) {
    return <Loading />;
  }
};

export default HomeContainer;