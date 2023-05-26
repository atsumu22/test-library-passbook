import React, { useState, useCallback } from 'react';
import SearchBar from '../../atoms/searchbars/SearchBar';
import axios from 'axios';
import styled from "@emotion/styled";
import QueryResults from '../queryResults/QueryResults';
import SelectButton from '../../atoms/buttons/SelectButtons';

const Query = () => {
  const [ titleSearch, setTitleSearch ] = useState(true);
  const [ authorSearch, setAuthorSearch ] = useState(false);
  const [ queryContent, setQueryContent ] = useState("");
  const [ booksResults, setBooksResults ] = useState([]);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ selected, setSelected ] = useState(true);

  const handleOnChange = () => {
    setSelected(!selected);
  };

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

  return (
    <>
    <SStickyContainer>
      <SQueryContainer>

        <SSwitchObject>
          <SelectButton value={selected ? "タイトル" : "著者"} onChange={handleOnChange} options={["タイトル", "著者"]} />
          <SearchBar placeholder={selected ? "本のタイトルで検索" : "著者名で検索"} onChange={onChangeText} value={queryContent}></SearchBar>
          <SRightButton onClick={selected? onClickTitleSearch : onClickAuthorSearch}>検索</SRightButton>
        </SSwitchObject>

      </SQueryContainer>

      {isLoaded && <QueryResults booksResults={booksResults}/>}

    </SStickyContainer>
    </>
  );
};

const SStickyContainer = styled.div`
  position: relative;
`;

const SQueryContainer = styled.div`
  background-color: #fff;
  margin: 16px 10px 0px 10px;
  padding: 16px 10px 16px 10px;
  border-radius: 10px;
  position: sticky;
  top: 16px;
  left: 0;
  z-index: 50;
`;

const SSwitchObject = styled.div`
  &.unactive {
    display: none;
  }
  display: flex;
  flex-direction: row;
  height: 50px;
  align-items: center;
`;

const SLeftButton = styled.div`
  background-color: #8bd3dd;
  width: 40%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SRightButton = styled.div`
  width: 25%;
  background-color: #f582ae;
  height: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;



export default Query;

// このコンポーネントの配下となるコンポーネントは再レンダリングから保護する必要あり。
// 子コンポーネント側でmemoを設定。
// useCallbackをこのコンポーネント内で使用する。
// 再レンダリングから保護したいコールバック関数に対して使用する。
// つまり、子コンポーネントにpropsとして渡されている関数すべて。
