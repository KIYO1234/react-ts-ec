import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "../views/ProductList";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../features/items/itemSlice";
import userReducer from "../features/users/userSlice";

describe('FilterInput', () => {
    // storeを作成
    let store:any;
    beforeEach(() => {
      store = configureStore({
        reducer: {
          items: itemReducer,
          user: userReducer,
        },
      });
    });

    it('should display keyword correctly', () => {
        render(
          <Provider store={store}>
            <ProductList />
          </Provider>
        );
        const inputField = screen.getByPlaceholderText("Search");
        userEvent.type(inputField, 'アサイー');
        expect(inputField.value).toBe('アサイー');
    })
})
