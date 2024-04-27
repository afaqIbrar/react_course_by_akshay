import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RestaurantCard, { withPromotedLabel } from '../RestaurantCard';
import MOCK_DATA from '../mocks/resCardMock.json';
it('should render Restaurant card component with props Data', () => {
  render(<RestaurantCard resData={MOCK_DATA} />);
  const name = screen.getByText('Chinese Wok');
  expect(name).toBeInTheDocument();
});

it('should render Restaurant card component with props Data', () => {
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  render(<RestaurantCardPromoted resData={MOCK_DATA} />);
  const name = screen.getByText('Promoted');
  expect(name).toBeInTheDocument();
});
