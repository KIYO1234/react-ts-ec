import React from 'react'

// App コンポーネントからオブジェクトの配列が渡ってくる想定
interface Props {
    frameworks?: {
        id: number,
        item: string
    }[]
}
const FrameworkList:React.FC<Props>= (props) => {
    if(!props.frameworks || props.frameworks.length === 0){
        return (
            <h1>No data !</h1>
        )
    } else {
        return (
            <>
            <ul>
                {props.frameworks.map(framework =>
                    <li key={framework.id}>{framework.item}</li>
                )}
            </ul>
            </>
        )
    }
}

export default FrameworkList
