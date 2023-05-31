import React from 'react';

const ModalContainer = (props) => {
  const { children, onClick  } = props;

  return (
      <div className="alert alert-info alert-dismissible fade show" role="alert">
        <div className="background-shadow">
        </div>
        <div className="flash-container">
          <button onClick={onClick} className="btn-close"></button>
          <div className="flash-container__items">
            {children}
            <button onClick={onClick} className="btn-secondary">閉じる</button>
          </div>
        </div>
      </div>
  );
};


export default ModalContainer;
