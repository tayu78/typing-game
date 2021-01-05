import { render, screen } from '@testing-library/react';
import Button from './Button';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  test('render Button', () => {
    render(<Button />);
  });

  test('ckick event and called handleClick', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);
    userEvent.click(screen.getByText('タイトルに戻る'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
})

