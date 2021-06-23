// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';
import { store } from './app/store'
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProductList from './views/ProductList'


// test('renders learn react link', () => {
//     render(<App />);
//     const linkElement = screen.getByText(/learn react/i);
//     expect(linkElement).toBeInTheDocument();
// });

  
  test('2 plus 2', () => {
    const value = 2 + 2
    expect(value).toBe(4)
  })
  
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
  ]
  
  test('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk')
  })
  
  const compileAndroidCode = () => {
    throw new Error('you are using the wrong JDK');
  }

  test('compiling android goes as expected', () => {
    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(() => compileAndroidCode()).toThrow(/JDK/)
  })

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

  test('cartList test', () => {
  const component = render(
    <Provider store={store}>
        <BrowserRouter>
            <ProductList />
        </BrowserRouter>
    </Provider>,
    );
});