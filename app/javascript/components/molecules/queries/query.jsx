import React, { useState } from 'react';
import SearchBar from '../../atoms/searchbars/SearchBar';
import PrimaryButton from '../../atoms/buttons/PrimaryButton';
import SecondaryButton from '../../atoms/buttons/SecondaryButton';
import axios from 'axios';
import styled from "@emotion/styled";
import QueryResults from '../queryResults/QueryResults';

const Query = () => {
  const [ titleSearch, setTitleSearch ] = useState(true);
  const [ authorSearch, setAuthorSearch ] = useState(false);
  const [ queryContent, setQueryContent ] = useState("");
  const [ booksResults, setBooksResults ] = useState([]);
  const [ isLoaded, setIsLoaded ] = useState(false);

  const onChangeText = (event) => setQueryContent(event.target.value);

  const onClickTitleSet = () => {
    titleSearch || setTitleSearch(true);
    authorSearch && setAuthorSearch(false);
  }

  const onClickAuthorSet = () => {
    titleSearch && setTitleSearch(false);
    authorSearch || setAuthorSearch(true);
  }

  const onClickTitleSearch = () => {
    // console.log("title");
    const queryValue = queryContent.replace(/( |　)+/g, "+");
    // console.log(queryValue);
    axios
    .get(`https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&title=${queryValue}&applicationId=1018371623494845154`)
    .then((res) => {
      if (res.data.Items.length === 0) {
        console.log("お探しの本は見つかりませんでした。");
        setIsLoaded(true);
        setBooksResults(null);
      } else {
        // console.log(typeof(res.data.Items));
        // console.log(res.data.Items);
        // console.log(res.data.Items[0].Item.title);
        const resultsObjects = res.data.Items.map(item => ({
          title: item.Item.title,
          author: item.Item.author,
          publisher: item.Item.publisherName,
          imageUrl: item.Item.mediumImageUrl,
          price: Math.round(item.Item.itemPrice / 1.1)
        }));
        // console.log(resultsObjects);
        setIsLoaded(true);
        setBooksResults(resultsObjects);
      };
    })
    .catch((err) => {
      setIsLoaded(true);
      setBooksResults(null);
    });
  };
  // isLoaded===trueのとき、mapを実行するコンポーネントに対して、props(booksResults)を渡す。

  const onClickAuthorSearch = () => {
    // console.log("author");
    const queryValue = queryContent.replace(/( |　)+/g, "+");
    // console.log(queryValue);
    axios
    .get(`https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&author=${queryValue}&applicationId=1018371623494845154`)
    .then((res)=>{
      if (res.data.Items.length === 0) {
        console.log("お探しの本は見つかりませんでした。");
        setIsLoaded(true);
        setBooksResults(null);
      } else {
        // console.log(typeof(res.data.Items));
        // console.log(res.data.Items);
        // console.log(res.data.Items[0].Item.title);
        const resultsObjects = res.data.Items.map(item => ({
          title: item.Item.title,
          author: item.Item.author,
          publisher: item.Item.publisherName,
          imageUrl: item.Item.mediumImageUrl,
          price: Math.round(item.Item.itemPrice / 1.1)
        }));
        // console.log(resultsObjects);
        setIsLoaded(true);
        setBooksResults(resultsObjects);
      };
    })
    .catch((err) => {
      setIsLoaded(true);
      setBooksResults(null);
    });
  };

  console.log(booksResults);
  console.log(isLoaded);

  return (
    <>
      <SecondaryButton onClick={onClickTitleSet}>タイトル</SecondaryButton>
      <SSwitchObject className={ titleSearch || "unactive"}>
        <SearchBar placeholder={"本のタイトルで検索"} onChange={onChangeText} value={queryContent}></SearchBar>
        <PrimaryButton onClick={onClickTitleSearch}>検索</PrimaryButton>
      </SSwitchObject>

      <SecondaryButton onClick={onClickAuthorSet}>著者</SecondaryButton>
      <SSwitchObject className={ authorSearch || "unactive"}>
        <SearchBar placeholder={"著者名で検索"} onChange={onChangeText} value={queryContent}></SearchBar>
        <PrimaryButton onClick={onClickAuthorSearch}>検索</PrimaryButton>
      </SSwitchObject>
      {isLoaded && <QueryResults booksResults={booksResults}/>}
    </>
  );
};

const SSwitchObject = styled.div`
  &.unactive {
    display: none;
  }
`;

export default Query;

// このコンポーネントの配下となるコンポーネントは再レンダリングから保護する必要あり。
// 子コンポーネント側でmemoを設定。
// useCallbackをこのコンポーネント内で使用する。
// 再レンダリングから保護したいコールバック関数に対して使用する。
// つまり、子コンポーネントにpropsとして渡されている関数すべて。
