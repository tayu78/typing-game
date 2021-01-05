import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Content from './Content';


describe('Content', () => {

  test('render title content', () => {
    render(<Content />);
    screen.getByText('NS-TYPING');
    screen.getByText('数字・記号専用のタイピング練習ゲーム');
    screen.getByText('スペースキーを押すと開始します');
  })

  test('spacekey down and then Game start', () => {
    render(<Content />);
    fireEvent.keyPress(document, { key: ' ' });
    screen.getByText('表示された数字または記号のキーを押してください');
    screen.getByTestId('symbol');
    screen.getByText('問題数:10');
    screen.getByText('正解数:0');
    screen.getByText('タイトルに戻る');
  });

  test('user  press correct  symbol and then go to next question', () => {
    render(<Content />);
    fireEvent.keyPress(document, { key: ' ' });
    screen.getByText('問題数:10');
    fireEvent.keyPress(document, { key: screen.getByTestId("symbol").textContent });
    screen.getByText('問題数:9');
    
  })

  test('restSymbolNumber = 0 and then display results, user press wrong key and then incorrecutNumber change', () => {
    render(<Content />)
    fireEvent.keyPress(document, { key: ' ' });//game start
    fireEvent.keyPress(document, { key: 'a' });// press wrong key
    for (let i = 0; i < 10; i++){
      fireEvent.keyPress(document, { key: screen.getByTestId("symbol").textContent });
    }
    screen.getByText('結果');
    screen.getByText('1');
    screen.debug();
  })

})
