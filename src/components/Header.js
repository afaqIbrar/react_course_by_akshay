import { LOGO_URL } from '../utils/constants';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';
export const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [btnNameReact, setBtnNameReact] = useState('Login');
  //This use effect will be called after every render of that component as there is no dependency array
  // useEffect(() => {
  //   console.log('useEffect Called without dependeny array');
  // });

  // //when the dependency array is present but it is empty then the useEffect will be alled on initial render only (just once)
  // useEffect(() => {
  //   console.log(
  //     'useEffect Called with dependeny array but empty dependeny array'
  //   );
  // }, []);

  // //if depdency array is [btnNameReact] then it will be called every time the btnNameReact updated
  // useEffect(() => {
  //   console.log(
  //     'useEffect Called with dependeny array and in dependenccy array we have btnNameReat'
  //   );
  // }, [btnNameReact]);

  const { loggedInUser } = useContext(UserContext);
  const onlineStatus = useOnlineStatus();
  return (
    <div className="flex justify-between bg-pink-100  shadow-l mb-4 lg:bg-green-50 sm:bg-yellow-50">
      <div className="logo-container">
        <img className="w-36" src={LOGO_URL} alt="logo" />
      </div>
      <div className="nav-items flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online Status : {onlineStatus ? '🟢' : '🔴'}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 font-bold text-xl">
            <Link to="/cart">Cart - ({cartItems.length} items)</Link>
          </li>
          <li className="px-4">
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
          <li data-testid="liUserName" className="px-4 font-bold">
            {loggedInUser}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
