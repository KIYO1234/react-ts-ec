import { render, screen } from '@testing-library/react'
import React, { useEffect } from 'react'
import UseEffectRender from './UseEffectRender'

describe('useEffect rendering', () => {
    // async関数のテストはテストの引数の関数もasyncでなければいけない
    it ('should render only after async func resolved', async() => {
        render(<UseEffectRender/>)
        // I am がないことのテスト（ないときなのでqueryByText）
        // I am といった一部の文字列が含まれるかのテストには正規表現を用いる（/で囲む/）
        expect(screen.queryByText(/I am/)).toBeNull();
        
        // 非同期の後にsetUserが走り、I am ~~~ が表示されることのテスト
        // findを使うと非同期処理が終わるまで待ってくれる（デフォルトが4秒になっていて超えるとtime out エラーが返る）
        expect(await screen.findByText(/I am/)).toBeInTheDocument()

        // 取得した情報をターミナル上に表示したい場合はscreen.debug()
        // screen.debug()
    })
})