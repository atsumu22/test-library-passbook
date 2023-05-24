import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const PrimaryButton = (props) => {
  const { children, onClick } = props;
  return (
    <SButton onClick={onClick}>
      {children}
    </SButton>
  );
};

const SButton = styled.button`
  background-color: #f582ae;
  color: #001858;
`;

export default PrimaryButton;
