import React from 'react';

const SearchBar = (props) => {
  const { placeholder, onChange, value } = props;

  return (
      <input className="form-search form-control" placeholder={placeholder} type="text" onChange={onChange} value={value}/>
  );
};

export default SearchBar;
