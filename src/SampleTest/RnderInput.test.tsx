import React from 'react'
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import RenderInput from "./RenderInput"
import { hasExpectedRequestMetadata } from '@reduxjs/toolkit/dist/matchers'

// 各テストケースの直後の操作をまとめておく（afterEach）
// cleanup関数をtest, it ごとに実行することで1つ1つが区切れてくれる
afterEach(() => cleanup())

// input と button が存在するかのテスト
// describe：タイトルを作る
describe('input と button がレンダリングされるかのテスト', () => {
    test('テストケース:should render all the elements', () => {
        render(<RenderInput />);
        expect(screen.getByRole('button')).toBeTruthy();
        // inputフォームにplaceholderがついている場合は、getByPlaceholderText()が使える
        expect(screen.getByPlaceholderText("Enter")).toBeTruthy();
    })
})

// 入力に応じてstateの値が変わるか
describe('Input form onChange event', () => {
    it('should update input', () => {
        // レンダリングするコンポーネントを取得
        render(<RenderInput />);

        // 定数にinput要素を代入
        const inputValue = screen.getByPlaceholderText('Enter');
        // userEvent.type(clickなどもある)でユーザーイベントを監視（タイピングをテストするので.type）
        // 第一引数：タイビングをかける要素、第二引数：入力する文字列の値
        // これでユーザーがinputValue（input要素）に、'test'という文字列を入力した状況を表現できる
        userEvent.type(inputValue, "test")

        expect(inputValue.value).toBe("test")
    });
})

// 条件分岐（文字列の有無に応じて発火するかしないか）
describe('console button conditionally triggered', () => {
    // inputに何もない時にoutputConsole()が呼び出されないことのテスト
    it('should not trigger output function', () => {
        // モック関数を定義（jest.fn()というのがある）:中身はないけど、呼び出されるかどうかのテストはできる
        const outputConsole = jest.fn();
        render(<RenderInput outputConsole={outputConsole}/>)
        userEvent.click(screen.getByRole("button"))
        expect(outputConsole).not.toHaveBeenCalled();
    })
    // 入力値がある時に関数が発火することのテスト
    it('should trigger output func', () => {
        // モック関数を用意
        const outputConsole = jest.fn();
        // renderでコンポーネントを持ってきて、モック関数をpropsに渡す
        render(<RenderInput outputConsole={outputConsole} />);
        // input要素をとってくる(今回はplaceholderで)
        const inputValue = screen.getByPlaceholderText("Enter");
        // ユーザーが'test'をinput要素に入力した状態を定義
        userEvent.type(inputValue, "test");
        // ボタンをクリックした状態を定義
        userEvent.click(screen.getByRole('button'))
        // 関数が一度だけ呼ばれるかのテスト
        expect(outputConsole).toHaveBeenCalledTimes(1);

    })
})

// 渡される関数をモックにしてテストする

export {}