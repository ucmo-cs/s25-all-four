import React from 'react';
import OfferItem from './OfferItem';
import './css/WhatWeOffer.css';
import { Element } from 'react-scroll';

const WhatWeOffer: React.FC = () => {
  return (
    <section className='WhatWeOffer'>
        <div className='Triangle'>aaa</div>
        <h1>What we Offer!</h1>
        <OfferItem/>
        <Element name='LeadersScroll'></Element>
    </section>
  );
}

export default WhatWeOffer;