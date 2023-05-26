import React, { useState } from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const SelectButton = (props) => {
  const { value, onChange, options } = props;

  return (
    <>
      <SSelect value={value} onChange={onChange}>
        {/* <option selected>aaa</option>ではなく、selectにvalue={selected}とする */}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </SSelect>
    </>
  );
};

const SSelect = styled.select`
  background-color: #8bd3dd;
  border: none;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;


export default SelectButton;
