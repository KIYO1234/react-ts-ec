// カスタムフックをテストするためのライブラリをインストールする必要がある
// npm i @testing-library/react-hooks
// npm i react-test-renderer

import { useCounter } from "../customHooks/useCounter";
import { act, renderHook } from '@testing-library/react-hooks';
import { cleanup } from '@testing-library/react';

afterEach(() => cleanup());

describe('useCounter custom Hook', () => {
    it('should increment by 1', () => {
        // renderHook()のresultプロパティを分割代入
        // renderHook()の引数には実行させてたいhookを設定
        const { result } = renderHook(() => useCounter(3));

        // result.currentプロパティで現在の値にアクセスできる
        // console.log(result.current)
            // {
            //     count: 3,
            //     increment: [Function: increment],
            //     decrement: [Function: decrement],
            //     double: [Function: double],
            //     triple: [Function: triple],
            //     reset: [Function: reset]
            // }
        
        // useCounter()の引数に3を渡した時に、stateの値(count)が3になっているかのテスト
        expect(result.current.count).toBe(3);

        // react-hooks libraryを使った場合は実行する処理をact()で囲む必要がある
        // increment()を実行する表現
        act(() => {
            result.current.increment()
        });

        // increment()が実行されたらresult.current.count が 4になっているはず
        expect(result.current.count).toBe(4);

    });
    it('should decrement by 1', () => {
        const { result } = renderHook(() => useCounter(3));
        expect(result.current.count).toBe(3);

        act(() => {
            result.current.decrement()
        });
        expect(result.current.count).toBe(2);
    });
    it('should double the counter value', () => {
        const { result } = renderHook(() => useCounter(3));
        expect(result.current.count).toBe(3);

        act(() => {
            result.current.double()
        });
        expect(result.current.count).toBe(6);
    });
    it('should triple the counter value', () => {
        const { result } = renderHook(() => useCounter(3));
        expect(result.current.count).toBe(3);

        act(() => {
            result.current.triple()
        });
        expect(result.current.count).toBe(9);
    });
    it('should reset to zero', () => {
        const { result } = renderHook(() => useCounter(3));
        expect(result.current.count).toBe(3);

        act(() => {
            result.current.reset()
        });
        expect(result.current.count).toBe(0);
    });
})