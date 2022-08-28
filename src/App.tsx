import { useEffect } from 'react';

import { Container } from '@mui/material';

import Info from './components/Info';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';

import { setTitle } from './utils/helper';

import './App.css';

const App = (): JSX.Element => {
  useEffect(() => {
    setTitle();
  }, []);

  return (
    <Container maxWidth='lg'>
      <Info />
      <About />
      <Projects />
      <Footer />
    </Container>
  );
};

export default App;
