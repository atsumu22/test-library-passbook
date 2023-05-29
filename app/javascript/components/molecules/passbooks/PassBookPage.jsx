import React, { useState } from 'react';
import FrontPage from '../../atoms/passbook/FrontPage';
import BackPage from '../../atoms/passbook/BackPage';

const PassBookPage = (props) => {
  const { devidedBooks, zIndex } = props;

  return (
    <label>
      <input type="checkbox"/>
      <FrontPage books={devidedBooks[0]} zIndex={zIndex}/>
      <BackPage books={devidedBooks[1]}/>
    </label>
  );
};

export default PassBookPage;
