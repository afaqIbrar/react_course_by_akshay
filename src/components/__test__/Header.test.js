import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';
import { Provider } from 'react-redux';
import appStore from '../../utils/appStore';
import { BrowserRouter } from 'react-router-dom';

it('it should load header with a login button', () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const button = screen.getByRole('button', { name: 'Login' });
  expect(button).toBeInTheDocument();

  // Always find button by Role
  //   const loginButton = screen.getByText('Login');
  //   expect(loginButton).toBeInTheDocument();

  // If more than one  button but only want to specifically as name Login
  //   const loginButton = screen.getByRole("button",{name:"Login"});
});

it('it should load header Component with cart item 0', () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const cartItem = screen.getByText('Cart - (0 items)');

  // How can I be flexible for string matching by regex
  //   const cartItem = screen.getByText(/Cart/);
  expect(cartItem).toBeInTheDocument();
});
it('it should change login button to logout on click ', () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const button = screen.getByRole('button', { name: 'Login' });
  fireEvent.click(button);
  const LogOutbutton = screen.getByRole('button', { name: 'Logout' });
  // How can I be flexible for string matching by regex
  //   const cartItem = screen.getByText(/Cart/);
  expect(LogOutbutton).toBeInTheDocument();
  fireEvent.click(LogOutbutton);
  const newbutton = screen.getByRole('button', { name: 'Login' });
  expect(newbutton).toBeInTheDocument();
});
