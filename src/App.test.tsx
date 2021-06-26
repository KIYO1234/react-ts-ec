import React from 'react';
import { render, screen } from '@testing-library/react';
import Render from './SampleTest/Render';

// import { store } from './app/store'
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import ProductList from './views/ProductList'
// import { Greeter } from './Test/warmingup.spec';
// import Hoge from './practice/Hoge';

// describe('rendering Hoge', () => {
//   it('should render all the elements correctly', () => {
//       render(<Render />);
//       // screen.debug()

//       // 個々の要素をとってくる→screen.getByRole(中身は決まっている:h1などのヘディング関係はheading, buttonはbuttonなど)
//       // screen.debug(screen.getByRole('heading'));
//       // screen.debug(screen.getByRole('button'));

//       // h1タグが存在するか確かめる
//       expect(screen.getByRole('heading')).toBeTruthy();
//       expect(screen.getByRole('textbox')).toBeTruthy();

//       // 複数ある場合：getAllByRole：配列形式で1つずつテスト
//       expect(screen.getAllByRole('button')[0]).toBeTruthy();
//       expect(screen.getAllByRole('button')[1]).toBeTruthy();

//       // テキストが存在するか：何が返ってくるか確かめるときはscreen.debugを使い、引数に行いたい操作を入れる
//       // screen.debug(screen.getByText('Udemy'))
//       expect(screen.getByText('Udemy')).toBeTruthy();
//       // 該当するテキストがないことを証明したいケースもある（getByTextだとgetByTextの段階でエラーになりその後の処置を実行できない）
//       // （＝なくてもテストにエラーを吐いて欲しくないとき）
//       // 該当しないときはnullを返してくれる→queryByText（toBeNull()と組み合わせる）
//       expect(screen.queryByText('Udeeeeeeemy')).toBeNull();
//       expect(screen.getByTestId('copyright')).toBeTruthy();
//   })
// })


// describe('rendering ProductList', () => {
//   it('should render all the elements correctly', () => {
//       render(<ProductList />);
//       screen.debug()
//   })
// })


// test('ProductList test', () => {
//   const component = render(
//     <Provider store={store}>
//         <BrowserRouter>
//             <ProductList />
//         </BrowserRouter>
//     </Provider>,
//   );
// });

// test('test', () => {
//     expect(new Greeter('Taro').getMessage()).toBe('Hello Taro');
// });

// test('renders learn react link', () => {
//     render(<App />);
//     const linkElement = screen.getByText(/learn react/i);
//     expect(linkElement).toBeInTheDocument();
// });

  
  test('2 plus 2', () => {
    const value = 2 + 2
    expect(value).toBe(4)
  })
  
  // const shoppingList = [
  //   'diapers',
  //   'kleenex',
  //   'trash bags',
  //   'paper towels',
  //   'milk',
  // ]
  
  // test('the shopping list has milk on it', () => {
  //   expect(shoppingList).toContain('milk');
  //   expect(new Set(shoppingList)).toContain('milk')
  // })
  
  // const compileAndroidCode = () => {
  //   throw new Error('you are using the wrong JDK');
  // }

  // test('compiling android goes as expected', () => {
  //   expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  //   expect(() => compileAndroidCode()).toThrow(/JDK/)
  // })

  // test('the data is peanut butter', done => {
  //   function callback (data) {
  //     try{
  //       expect(data).toBe('peanut butter');
  //       done;
  //     } catch (error) {
  //       done(error);
  //     }
  //   }

  //   fetchData(callback)
  // })
