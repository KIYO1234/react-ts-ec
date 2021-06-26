import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import FrameworkList from './FrameworkList'

afterEach(() => cleanup());

describe('rendering the list with props', () => {
    it('no props show No data!!', () => {
        // レンダリングするコンポーネント
        render(<FrameworkList />);
        // HTML構造の中に特定の文字列が含まれるか
        expect(screen.getByText('No data !')).toBeInTheDocument();

    })
    
    it('should render list item correctly', () => {
        // App.tsx から値を渡すと単体テストじゃなくなるからモックを作る
        const dummyData = [
            {id: 1, item: 'React dummy'},
            {id: 2, item: 'Angular dummy'},
            {id: 3, item: 'Vue dummy'},
        ]
        render(<FrameworkList frameworks={dummyData}/>)
        // list は listitem で取得
        // mapかけたitemからテキストを抽出するのがtextContent
        // screenはrenderしたコンポーネントに対して操作することを示す命令
        const frameworkItems = screen.getAllByRole("listitem").map((ele) => ele.textContent);
        // frameworkItems が dummyData と合致するかテスト
        // dummyDataからitemだけを取り出しておく
        const dummyItems = dummyData.map((ele) => ele.item);
        expect(frameworkItems).toEqual(dummyItems);
        // ないことを示すときは queryByText
        expect(screen.queryByText('No data !')).toBeNull()

    })
})