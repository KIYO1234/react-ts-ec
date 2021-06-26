import React from 'react'

const Render: React.FC = () => {
    return (
        <div>
            <h1>React Testing Library Lesson</h1>
            <input type="text" />
            <button>Click1</button>
            <button>Click2</button>
            <p>Udemy</p>
            <span data-testid='copyright'>@React</span>
        </div>
    )
}

export default Render
