import React from 'react';

const DeleteModalContainer = (props) => {
  const { children, onClickDeleteBook, onClickCancel  } = props;

  return (
      <div className="alert alert-info alert-dismissible fade show" role="alert">
        <div className="background-shadow">
        </div>
        <div className="flash-container">
          <button onClick={onClickCancel} className="btn-close"></button>
          <div className="flash-container__items">
            {children}
            <div className="modal-footer">
            <button onClick={onClickCancel} className="btn btn-secondary me-2">キャンセル</button>
            <button onClick={onClickDeleteBook} className="btn btn-primary">削除する</button>
          </div>
          </div>
        </div>
      </div>
  );
};


export default DeleteModalContainer;
