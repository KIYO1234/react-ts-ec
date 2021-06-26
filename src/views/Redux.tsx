import { makeStyles } from '@material-ui/core'
import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { increment, decrement, incrementByAmount, selectCount } from '../features/customCounter/customCounterSlice'

const useStyle = makeStyles({
    root: {
       textAlign: 'center',
       marginBottom: 200,
    }
})

const Redux:React.FC = () => {
    const [number, setNumber] = useState<number>(0)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setNumber(Number(e.target.value))
    }
    const handleAmount = () => {
        dispatch(incrementByAmount(number))
        setNumber(0)
    }
    const classes = useStyle()
    const dispatch = useDispatch()
    const counter = useSelector((state:RootState) => state.customCounter)
    // console.log(counter)
    
    return (
        <div className={classes.root}>
            <h1>Redux Integration test</h1>

            <button onClick={() => dispatch(increment())}>+</button>

            <span data-testid='count-value'>{counter.value}</span>

            <button onClick={() => dispatch(decrement())}>-</button>

            <button onClick={handleAmount}>IncrementByAmount</button>

            <input type="number" placeholder='Enter' value={number} onChange={handleChange}/>
        </div>
    )
}

export default Redux
