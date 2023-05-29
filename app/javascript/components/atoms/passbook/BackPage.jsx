import React from 'react';
import PageContents from './PageContents';

const BackPage = (props) => {
  const { books } = props;

  return (
    <span>
      {books.map((book) => <PageContents book={book} />)}
    </span>
  );
};

export default BackPage;
