import React, { MouseEventHandler } from 'react';

type ErrorScreenProps = {
  handleClose: MouseEventHandler<HTMLButtonElement>
}

function ErrorScreen(props: ErrorScreenProps): JSX.Element {
  const {handleClose} = props;
  return (
    <React.Fragment>
      <h1>Ошибка! Что-то пошло не так.</h1>
      <button
        onClick={handleClose}
      >
        Закрыть
      </button>
    </React.Fragment>
  );
}

export default ErrorScreen;
