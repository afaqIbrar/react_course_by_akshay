import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import RestaurantMenuPage from '../RestaurantMenuPage';
import MOCK_DATA from '../mocks/mockResMenu.json';
import appStore from '../../utils/appStore';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../Cart';
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(MOCK_DATA) })
);

it('Should load restaurant Menu Component', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenuPage />
          <Cart />
        </Provider>
      </BrowserRouter>
    )
  );
  const accordianHeader = screen.getByText('Fresh Juice (24)');
  fireEvent.click(accordianHeader);
  const foodItems = screen.getAllByTestId('foodItems');
  expect(foodItems.length).toBe(24);
  const addBtn = screen.getAllByRole('button', { name: 'Add +' });
  expect(screen.getByText('Cart - (0 items)')).toBeInTheDocument();

  fireEvent.click(addBtn[0]);

  expect(screen.getByText('Cart - (1 items)')).toBeInTheDocument();
  fireEvent.click(addBtn[1]);

  expect(screen.getByText('Cart - (2 items)')).toBeInTheDocument();

  // 2 items from carts and 24 from restaurant menu page
  expect(screen.getAllByTestId('foodItems').length).toBe(26);

  const clearButton = screen.getByRole('button', { name: 'Clear Cart' });
  fireEvent.click(clearButton);
  expect(screen.getAllByTestId('foodItems').length).toBe(24);
  expect(
    screen.getByText('Cart is Empty. Add items to the cart')
  ).toBeInTheDocument();
});
