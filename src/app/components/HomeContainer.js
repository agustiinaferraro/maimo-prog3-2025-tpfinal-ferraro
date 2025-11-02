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
        <Actindividual />
        <Actividades />
        <Predicas />
      </div>
    );
  } catch (error) {
    return <Loading />;
  }
};

export default HomeContainer;