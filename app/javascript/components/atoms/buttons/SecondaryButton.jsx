import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const SecondaryButton = (props) => {
  const { children, onClick } = props;
   return (
    <SButton onClick={onClick}>
      {children}
    </SButton>
  );
};

const SButton = styled.button`
  background-color: #8bd3dd;
  color: #001858;
`;

export default SecondaryButton;
