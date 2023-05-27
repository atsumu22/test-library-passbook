import React, { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import axios from 'axios';
import { csrfToken } from '@rails/ujs';
// -> important


const BookmarkCard = (props) => {
  const { bookData } = props;
  const [ logClicked, setLogClicked ] = useState(false);
  const [ DeleteClicked, setDeleteClicked ] = useState(false);

  const onClickPostToLog = () => {
    bookData.status = 0
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    // -> important
    axios.post('http://localhost:3000/books', bookData).then(() => {});
    // axios.post('http://localhost:3000/books', {
      // book: {bookData}}).then(() => {});
    // console.log(bookData);
    DeleteClicked && setDeleteClicked(false);
    logClicked || setLogClicked(true);
  }

  const onClickDelete = () => {
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    axios.delete(`http://localhost:3000/books/${bookData.id}`).then(() => {});
    logClicked && setLogClicked(false);
    DeleteClicked || setDeleteClicked(true);
  }

  return (
    <SBookCard>
      <BrowserRouter>
        { bookData.image_url ? <img src={bookData.image_url} alt="book-image" /> : <SPlaceHolder /> }
        <div className="bookinfo">
          <div className="bookinfo__text">
            <p className="bookinfo__text__title">{bookData.title}</p>
            <p className="bookinfo__text__author">{bookData.author}</p>
            <p className="bookinfo__text__publisher">{bookData.publisher}</p>
            <p className="bookinfo__text__publisher">¥{bookData.price.toLocaleString()}</p>
          </div>
          <div className="bookinfo__button">
            <SButton onClick={onClickPostToLog} className={logClicked && "clicked"} style={{ marginRight: "6px" }} disabled={logClicked && "disabled"}><p>+ 記帳</p></SButton>
            <SButton onClick={onClickDelete}  className={DeleteClicked && "clicked"} disabled={DeleteClicked && "disabled"}><p>削除</p></SButton>
          </div>
        </div>
      </BrowserRouter>
    </SBookCard>
  );
};

const SBookCard = styled.div`
  background-color: #fff;
  height: 200px;
  border-radius: 15px;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  margin: 10px;
  & img {
    width: 40%;
    max-width: 40%;
    max-height: 100%;
    object-fit: cover;
  }
  & .bookinfo {
    margin-left: 5%;
    height: 100%;
    position: relative;
    width: 55%;
    max-width: 55%;
    &__text {
      &__title {
        font-weight: bold;
        margin: 0 0 3px 0;
      }
      &__author, &__publisher {
        margin: 0;
      }
    }
    &__button {
      text-align: right;
      display: flex;
      flex-direction: raw;
      justify-content: end;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
`;

const SPlaceHolder = styled.div`
  background-color: gray;
  opacity: 0.7;
  height: 100%;
  width: 40%;
  margin-right: 10px;
`;

const SButton = styled.button`
  background-color: #fff;
  color: #172c66;
  transition: all 0.3s;
  border: solid 0.5px #172c66;
  border-radius: 5px;
  &.clicked {
    background-color: #172c66;
    color: white;
  }
  & > p {
    margin: 0px;
  }
  & .margin-right {
    margin-right: 5px;
  }
`;


export default BookmarkCard;
