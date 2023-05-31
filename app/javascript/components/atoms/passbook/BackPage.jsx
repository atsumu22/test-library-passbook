import React from 'react';
import PageContents from './PageContents';

const BackPage = (props) => {
  const { books } = props;

  return (
    <span>
      {books && books.map((book) => <PageContents book={book} key={book.id}/>)}
    </span>
  );
};

export default BackPage;
