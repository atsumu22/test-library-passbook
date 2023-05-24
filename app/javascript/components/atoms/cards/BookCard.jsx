import React, { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import axios from 'axios';
import { csrfToken } from '@rails/ujs';
// -> important


const BookCard = (props) => {
  const { book } = props;
  const [ logClicked, setLogClicked ] = useState(false);
  const [ BookmarkClicked, setBookmarkClicked ] = useState(false);

  const onClickPostToLog = () => {
    const bookData = {title: book.title, author: book.author, publisher: book.publisher, price: book.price, image_url: book.imageUrl, status: 0 }
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    // -> important
    axios.post('http://localhost:3000/books', bookData).then(() => {});
    // axios.post('http://localhost:3000/books', {
      // book: {bookData}}).then(() => {});
    // console.log(bookData);
    BookmarkClicked && setBookmarkClicked(false);
    logClicked || setLogClicked(true);
  }

  const onClickPostToBookmark = () => {
    const bookData = {title: book.title, author: book.author, publisher: book.publisher, price: book.price, image_url: book.imageUrl, status: 1 }
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    axios.post('http://localhost:3000/books', bookData).then(() => {});
    logClicked && setLogClicked(false);
    BookmarkClicked || setBookmarkClicked(true);
  }

  return (
    <SBookCard>
      <BrowserRouter>
        { book.imageUrl ? <img src={book.imageUrl} alt="book-image" /> : <SPlaceHolder /> }
        <div className="bookinfo">
          <div className="bookinfo__text">
            <p className="bookinfo__text__title">{book.title}</p>
            <p className="bookinfo__text__author">{book.author}</p>
            <p className="bookinfo__text__publisher">{book.publisher}</p>
            <p className="bookinfo__text__publisher d-none">¥{book.price.toLocaleString()}</p>
          </div>
          <div className="bookinfo__button">
            <SButton onClick={onClickPostToLog} className={logClicked && "clicked"} disabled={logClicked && "disabled"}><i className="fa-regular fa-square-plus"></i></SButton>
            <SButton onClick={onClickPostToBookmark}  className={BookmarkClicked && "clicked"} disabled={BookmarkClicked && "disabled"}><i className="fa-regular fa-bookmark"></i></SButton>
          </div>
        </div>
      </BrowserRouter>
    </SBookCard>
  );
};

const SBookCard = styled.div`
  background-color: #fff;
  height: 150px;
  box-shadow: 5px 5px 5px #7f7f7f;
  border-radius: 15px;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  & img {
    width: auto;
    height: 100%;
    background-color: gray;
    margin-right: 10px;
    object-fit: cover;
  }
  & .bookinfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
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
    }
  }
`;

const SPlaceHolder = styled.div`
  background-color: gray;
  opacity: 0.7;
  width: 90px;
  height: 150px;
`;

const SButton = styled.button`
  background-color: white;
  color: blue;
  transition: all 0.3s;
  border: none;
  border-radius: 5px;
  &.clicked {
    background-color: blue;
    color: white;
  }
`;


export default BookCard;
