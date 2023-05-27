import React from 'react';
import BookmarkCard from '../../atoms/cards/BookmarkCard';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const BookmarkCards = (props) => {
  const { booksFromServer } = props;

  return (
    <SContaienr>
      {booksFromServer.length > 0 ? booksFromServer.map((bookData) => <BookmarkCard bookData={bookData} key={bookData.id}/>) : <SPlaceHolder><h2>ブックマークには</h2><h2>まだ何も保存されていません</h2></SPlaceHolder> }
    </SContaienr>
  );
};

const SContaienr = styled.div`
  margin-bottom: 100px;
`;

const SPlaceHolder = styled.div`
  margin: 40px 14px 14px 14px;
  text-align: center;
`;

export default BookmarkCards;
