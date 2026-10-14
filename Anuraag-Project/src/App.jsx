import React from 'react';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Affiliations from './Affiliations/Affiliations';
import Falcons from './Falcons/Falcons';
import Quote from './Quote/Quote';
import Lectern from './Lectern/Lectern';
import Diagnostics from './Diagnostics/Diagnostics';
import Ebook from './Ebook/Ebook';
import Footer from './Footer/Footer';
import './App.css';

export default function App() {
  return (
    <div className="appWrapper">
      <Nav />
      <main>
        <Home />
        <Affiliations />
        <Falcons />
        <Quote />
        <Lectern />
        <Diagnostics />
        <Ebook />
      </main>
      <Footer />
    </div>
  );
}
