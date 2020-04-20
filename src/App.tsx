import React, { FC, useState } from 'react';
import axios from 'axios';

const App: FC = () => {
  const [message, setMessage] = useState('こんにちは');
  const fetchMessage = () => {
   axios
    .get(`${process.env.REACT_APP_API_HOST}`)
    .then(res => {
      setMessage(res.data.message);
    })
    .catch(error => {
      console.error(error);
    })
  }

  return (
    <React.Fragment>
      <h1>{message}</h1>
      <button onClick={fetchMessage}>Change message</button>
    </React.Fragment>
  )
}

export default App;
