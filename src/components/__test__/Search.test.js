import { fireEvent, render, screen } from '@testing-library/react';
import Body from '../Body';
import MOCK_DATA from '../mocks/resDataMock.json';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../Header';
import { Provider } from 'react-redux';
import appStore from '../../utils/appStore';
import UserContext from '../../utils/UserContext';
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    }
  });
});

it('Should Render the Body Component with Search button', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );
  const searchBtn = screen.getByRole('button', { name: 'Search' });
  expect(searchBtn).toBeInTheDocument();
});

it('Should Render the Body Component with Search functionality for pizza input', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );
  const cardsBeforeSearch = screen.getAllByTestId('resCard');
  expect(cardsBeforeSearch.length).toBe(9);
  const searchBtn = screen.getByRole('button', { name: 'Search' });
  const searchInput = screen.getByTestId('SearchInput');
  fireEvent.change(searchInput, { target: { value: 'pizza' } });
  fireEvent.click(searchBtn);

  const resCard = screen.getAllByTestId('resCard');
  expect(resCard.length).toBe(1);
});

it('Should filter top rated restaurant on click of button top rated restaurant', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });
  const cardBeforeFilter = screen.getAllByTestId('resCard');
  expect(cardBeforeFilter.length).toBe(9);

  const topRatedBtn = screen.getByRole('button', {
    name: 'Top Rated Restaurants'
  });
  fireEvent.click(topRatedBtn);
  const cardsAfterFilter = screen.getAllByTestId('resCard');
  expect(cardsAfterFilter.length).toBe(4);
});

// it('Should change the name when input change', async () => {
//   const mockUserContextValue = {
//     loggedInUser: 'Test User',
//     setUserName: jest.fn() // Mock the setUserName function
//   };
//   await act(async () => {
//     render(
//       <BrowserRouter>
//         <UserContext.Provider value={mockUserContextValue}>
//           <Provider store={appStore}>
//             <Header />
//             <Body />
//           </Provider>
//         </UserContext.Provider>
//       </BrowserRouter>
//     );
//   });
//   const searchInput = screen.getByTestId('UserNameInput');
//   fireEvent.change(searchInput, { target: { value: 'Test Input' } });
//   const val = screen.getByText(/Test Input/);
//   expect(val).toBeInTheDocument();
// });
