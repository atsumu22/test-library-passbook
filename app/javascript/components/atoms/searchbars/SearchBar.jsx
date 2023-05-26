import React from 'react';

const SearchBar = (props) => {
  const { placeholder, onChange, value } = props;

  return (
      <input className="form-search form-control" placeholder={placeholder} style={{ height: "50px" }} type="text" onChange={onChange} value={value}/>
  );
};

export default SearchBar;
