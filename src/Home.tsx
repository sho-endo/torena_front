import React, { FC, useState } from 'react';
import axios from 'axios';

const Home: FC = () => {
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
      <h1>Homeページです</h1>
      <h2>{message}</h2>
      <button onClick={fetchMessage}>Change message</button>
    </React.Fragment>
  )
}

export default Home;
