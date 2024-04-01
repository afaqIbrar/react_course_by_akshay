import { LOGO_URL } from '../utils/constants';
import { useEffect, useState } from 'react';
export const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState('Login');
  //This use effect will be called after every render of that component as there is no dependency array
  useEffect(() => {
    console.log('useEffect Called without dependeny array');
  });

  //when the dependency array is present but it is empty then the useEffect will be alled on initial render only (just once)
  useEffect(() => {
    console.log(
      'useEffect Called with dependeny array but empty dependeny array'
    );
  }, []);

  //if depdency array is [btnNameReact] then it will be called every time the btnNameReact updated
  useEffect(() => {
    console.log(
      'useEffect Called with dependeny array and in dependenccy array we have btnNameReat'
    );
  }, [btnNameReact]);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <li>
            <button
              className="login"
              onClick={() => {
                btnNameReact === 'Login'
                  ? setBtnNameReact('Logout')
                  : setBtnNameReact('Login');
              }}
            >
              {btnNameReact}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
