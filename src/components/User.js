import React, { useEffect } from 'react';
import { useState } from 'react';
const User = ({ name }) => {
  const [count, setCount] = useState(0);
  return (
    <div className="user-card">
      <h1>Count: {count}</h1>
      <h2>Name: {name}</h2>
      <h3>Location: Lahore</h3>
      <h4>Contact: 032222222</h4>
    </div>
  );
};

export default User;
