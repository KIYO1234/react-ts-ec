import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductList } from '../views';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../features/items/itemSlice";
import userReducer from "../features/users/userSlice";

describe('Rndering ProductList', () => {
    it('Should render ProductList correctly', () => {
        let store: any;
        // beforeEach(() => {
            store = configureStore({
                reducer: {
                    user: userReducer,
                    item: itemReducer,
                },
            });
        // });
        render(
            <Provider store={store}>
                <ProductList />
            </Provider>
        );
        // expect(screen.queryByText('Hawaiianパラダイス')).not.toBeInTheDocument();
    });
});