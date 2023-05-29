import React from 'react';
import PageContents from './PageContents';

const FrontPage = (props) => {
  const { books, zIndex } = props;
  console.log(books);
  console.log(999-zIndex);

  return (
    <span style={{ zIndex: `${999 - zIndex.toString()}`}}>
      {books.map((book) => <PageContents book={book} />)}
    </span>
  );
};

export default FrontPage;
