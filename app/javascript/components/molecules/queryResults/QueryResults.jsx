import React from 'react';
import BookCard from '../../atoms/cards/BookCard';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const QueryResults = (props) => {
  const { booksResults } = props;

  console.log(booksResults);

  return (
    <SContainer>
      {booksResults ? booksResults.map((bookResult, index) => <BookCard book={bookResult} key={index}/>) : <h2>お探しの本は見つかりませんでした。別のキーワードで再度検索をお願いします。</h2> }
    </SContainer>
  );
};

const SContainer = styled.div`
  margin-bottom: 100px;
`;

export default QueryResults;

// このコンポーネントの役割は、
// queryコンポーネントから受け取ったbooksResultsに対してmapをかける
// queryコンポーネント側で先にデータを最適化する必要がある。
// map処理の中で、booksResultsの一つ一つの値に対して、
// BooksCardコンポーネントが読み込める状態のオブジェクトリテラルに変換する。
// そのオブジェクトをBooksCardコンポーネントにpropsとして渡す。
// BookCardコンポーネントはpropsとしてbookのみ必要としている。
