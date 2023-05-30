import React from 'react';

const PageContents = (props) => {
  const { book } = props;
  console.log(book);

  return (
    <div className="column">
      <div className="title-and-date">
        <p className="date">{book.updated_at.toString().substr(0,10)}</p>
        <p className="title">{book.title.length > 18 ? `${book.title.substr(0,18)}[..]` : book.title}</p>
      </div>
      <p className="price">{book.price}</p>
    </div>
 );
};

export default PageContents;
