import React, { useState } from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";


const navbarButtons = () => {
  const [ clickedIcons, setClickedIcons ] = useState([true, false, false, false]);

  const onClickToPass = () => {
    setClickedIcons([true, false, false, false]);
  };

  const onClickToSearch = () => {
    setClickedIcons([false, true, false, false]);
  };

  const onClickToBookmark = () => {
    setClickedIcons([false, false, true, false]);
  };

  const onClickToUser = () => {
    setClickedIcons([false, false, false, true]);
  };

  return (
    <SNavbar>
      <SClickedActive onClick={onClickToPass} className={clickedIcons[0] && "active"}></SClickedActive>
      <SClickedActive onClick={onClickToSearch} className={clickedIcons[1] && "active"}></SClickedActive>
      <SClickedActive onClick={onClickToBookmark} className={clickedIcons[2] && "active"}></SClickedActive>
      <SClickedActive onClick={onClickToUser} className={clickedIcons[3] && "active"}></SClickedActive>
    </SNavbar>
  );
};

const SNavbar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  width: 100%;
  height: 80px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SClickedActive = styled.div`
  opacity: 0;
  width: 50px;
  height: 50px;
  margin: 0px 15px;
  border-radius: 50%;
  background-color: #f582ae;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    opacity: 1;
  }
`;

export default navbarButtons;
