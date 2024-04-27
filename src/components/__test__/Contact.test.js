import Contact from '../Contact';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
describe('Contact Us Page Test Cases', () => {
  test('Should load contact us component', () => {
    render(<Contact />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });

  it('Should load button inside contact component', () => {
    render(<Contact />);
    const button = screen.getByRole('button');

    // Another way
    // const button = screen.getByText('Submit');

    expect(button).toBeInTheDocument();
  });

  test('Should load input name inside contact component', () => {
    render(<Contact />);
    const inputName = screen.getByPlaceholderText('name');
    expect(inputName).toBeInTheDocument();
  });

  test('should load 2 input boxes on the Contact component', () => {
    render(<Contact />);
    // role of input box is textbox

    // Querying
    const inputBoxes = screen.getAllByRole('textbox');
    // we will get piece of jsx or react element
    expect(inputBoxes.length).toBe(2);
  });
});
