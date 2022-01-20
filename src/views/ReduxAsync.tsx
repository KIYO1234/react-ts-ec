import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCount, fetchDummy, selectUsername, fetchJSON } from '../features/customCounter/customCounterSlice'

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
    }
})

const ReduxAsync:React.FC = () => {
    const classes = useStyles();
    const count = useSelector(selectCount);
    const username = useSelector(selectUsername);
    
    const dispatch = useDispatch() ;

    return (
        <div className={classes.root}>
            {/* <h1>Redux Async</h1> */}
            <span data-testid='count-value'>{count}</span>
            <button onClick={() => dispatch(fetchDummy(5))}>FetchDummy</button>
            {username && <h1>{username}</h1>}
            <button onClick={() => dispatch(fetchJSON())}>FetchJSON</button>
        </div>
    )
}

export default ReduxAsync
