import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "../views/ProductList";
import { OrderFinished } from "../views";
import userEvent from "@testing-library/user-event";
// import { useHistory } from "react-router";
import { createMemoryHistory } from 'history';
import { BrowserRouter } from "react-router-dom";

import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../features/items/itemSlice";
import userReducer from "../features/users/userSlice";
import firebase from "firebase";
// Firestoreのモック用
import { mockFirebase } from 'firestore-jest-mock';

// Firestoreのモック作成（ログイン機能には必要ない）
const {mockCollection} = require('firestore-jest-mock/mocks/firestore');


describe('OrderFinished', () => {
    it('should render OrderFinished component correctly', () => {
        render(<OrderFinished />);
        expect(screen.getByText('決済完了')).toBeTruthy();
        expect(
          screen.getByText(
            "この度は当サイトをご利用いただき、ありがとうございました。またのご利用をお待ちしております。"
          )
        ).toBeTruthy();
        expect(screen.getByRole('button')).toBeTruthy();
    });
    it('should route to ProductList when button clicked', () => {
      render(<OrderFinished />);
    //   // 画面遷移のテスト
    //   // useHistoryをモック化する
    //   const mockHistoryPush = jest.fn();
    //   jest.mock("react-router-dom", () => ({
    //     ...jest.requireActual("react-router-dom"),
    //     useHistory: () => ({
    //       // pushメソッドをダミー関数で上書きする
    //       push: mockHistoryPush,
    //     }),
    //   }));
    //   userEvent.click(screen.getByRole("button"));
    //   expect(mockHistoryPush).toHaveBeenCalledWith("/");


      // // 画面遷移のテスト
      // // useHistoryをモック化する

      // // const button = screen.getByRole('button');
      // // console.log(button);
      // // screen.debug(button);
      // userEvent.click(screen.getByText('ホームへ'));
      // // screen.debug();
      // // render(<ProductList />);
      // expect(mockHistoryPush).toBeCalledWith('/');

      // // createMemoryHistoryを使う方法
      // const history = createMemoryHistory();
      // history.push('/');
      // console.log(history);
      // render(
      //     <BrowserRouter>
      //         <ProductList />
      //     </BrowserRouter>
      // )

      // // mockを作る（別パターン）
      // jest.mock('react-router-dom', () => ({
      //     useHistory: ():any => ({
      //         push: jest.fn(),
      //     }),
      // }));
      // // const wrapper = mount(<OrderFinished />)

      // link()関数が呼ばれることの確認

    });
    
});

describe('Store', () => {
    let store:any;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                user: userReducer,
                item: itemReducer, 
            }
        });
    });
    it('should create store correctly', () => {
        
        
    });
})