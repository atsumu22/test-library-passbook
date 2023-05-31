import React, { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import axios from 'axios';
import { csrfToken } from '@rails/ujs';
// -> important
import ModalContainer from '../modal/ModalContainer';


const BookCard = (props) => {
  const { book } = props;
  const [ logClicked, setLogClicked ] = useState(false);
  const [ BookmarkClicked, setBookmarkClicked ] = useState(false);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ isError, setIsError ] = useState(false);
  const [ isUpdated, setIsUpdated ] = useState(false);
  const [ isSwitched, setIsSwitched ] = useState(false);

  const onClickPostToLog = () => {
    const bookData = {title: book.title, author: book.author, publisher: book.publisher, price: book.price, image_url: book.imageUrl, status: 0 }
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    // -> important
    axios.post('http://localhost:3000/books', bookData)
      .then((res) => {
        if (res.status === 200) {
          isLoaded || setIsLoaded(true)
        } else {
          isUpdated || setIsUpdated(true)
        }
      })
      .catch((res) => {
        isError || setIsError(true)
      });
    // axios.post('http://localhost:3000/books', {
      // book: {bookData}}).then(() => {});
    // console.log(bookData);
    BookmarkClicked && setBookmarkClicked(false);
    logClicked || setLogClicked(true);
  }

  const onClickPostToBookmark = () => {
    const bookData = {title: book.title, author: book.author, publisher: book.publisher, price: book.price, image_url: book.imageUrl, status: 1 }
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    axios.post('http://localhost:3000/books', bookData)
      .then((res) => {
        if (res.status === 200) {
          isLoaded || setIsLoaded(true)
        } else {
          isUpdated || setIsUpdated(true)
        }
      })
      .catch((res) => {
        isError || setIsError(true)
      });
    logClicked && setLogClicked(false);
    BookmarkClicked || setBookmarkClicked(true);
    console.log(isUpdated);
  };

  const onClickDeleteModal = () => {
    isLoaded && setIsLoaded(false);
    isError && setIsError(false);
    isUpdated && setIsUpdated(false);
  };

  return (
    <>
      <SBookCard>
        <BrowserRouter>
          { book.imageUrl ? <img src={book.imageUrl} alt="book-image" /> : <SPlaceHolder /> }
          <div className="bookinfo">
            <div className="bookinfo__text">
              <p className="bookinfo__text__title">{book.title.length > 40 ? `${book.title.substr(0,40)}[..]` : book.title}</p>
              <p className="bookinfo__text__author">{book.author.length > 20 ? `${book.author.substr(0,20)}[..]` : book.author}</p>
              <p className="bookinfo__text__publisher">{book.publisher.length > 20 ? `${book.publisher.substr(0,20)}[..]` : book.publisher}</p>
              <p className="bookinfo__text__publisher">¥{book.price.toLocaleString()}</p>
            </div>
            <div className="bookinfo__button">
              <SButton onClick={onClickPostToLog} className={logClicked && "clicked"} style={{ marginRight: "6px" }} disabled={logClicked && "disabled"}><p>+ 記帳</p></SButton>
              <SButton onClick={onClickPostToBookmark}  className={BookmarkClicked && "clicked"} disabled={BookmarkClicked && "disabled"}><p><i className="fa-regular fa-bookmark"></i> 保存</p></SButton>
            </div>
          </div>
        </BrowserRouter>
      </SBookCard>
      {isLoaded && <ModalContainer onClick={onClickDeleteModal}>{`『${book.title}』を記録しました`}</ModalContainer>}
      {isUpdated && <ModalContainer onClick={onClickDeleteModal}>{`『${book.title}』の登録区分を切り替えました`}</ModalContainer>}
      {isError && <ModalContainer onClick={onClickDeleteModal}>{`『${book.title}』はすでに登録されています`}</ModalContainer>}
    </>
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


export default BookCard;
