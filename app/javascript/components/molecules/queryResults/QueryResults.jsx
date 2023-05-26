import React from 'react';
import BookCard from '../../atoms/cards/BookCard';

const QueryResults = (props) => {
  const { booksResults } = props;

  console.log(booksResults);

  return (
    <div>
      {booksResults ? booksResults.map((bookResult, index) => <BookCard book={bookResult} key={index}/>) : <h2>お探しの本は見つかりませんでした。別のキーワードで再度検索をお願いします。</h2> }
    </div>
  );
};

export default QueryResults;

// このコンポーネントの役割は、
// queryコンポーネントから受け取ったbooksResultsに対してmapをかける
// queryコンポーネント側で先にデータを最適化する必要がある。
// map処理の中で、booksResultsの一つ一つの値に対して、
// BooksCardコンポーネントが読み込める状態のオブジェクトリテラルに変換する。
// そのオブジェクトをBooksCardコンポーネントにpropsとして渡す。
// BookCardコンポーネントはpropsとしてbookのみ必要としている。
