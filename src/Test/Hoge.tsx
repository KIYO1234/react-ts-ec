import React, { useEffect, useState } from 'react'
import * as practice from '../practice/practice'
import BackspaceIcon from '@material-ui/icons/Backspace';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { VoidExpression } from 'typescript';
import {Select, MenuItem} from '../components/index'

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
    },
    title: {
        marginTop: '10%',
        textAlign: 'center',
        fontSize: 30,
    },
    inputBase: {
        border: '1px solid transparent',
        boxShadow: '0 2px 5px 1px rgb(64 60 67 / 16%)',
        borderRadius: 24,
        width: 100,
        paddingLeft: 30,
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    inputArea: {
        width: 100,
    },
})

// 独自フック（stateと変更する関数の2つが必要：useStateと同じイメージ）
const useCounter = () => {
    // state: numがそれに当たる
    const [num, setNum] = useState(0)
    // 関数: count()
    const count:any = ():void => {
        console.log('countが実行されました')
        setNum(num + 1)
    }
    // return は2つ以上
    return [num, count]
}
const useTax = (t1:number, t2:number) => {
    const [price, setPrice] = useState(1000)
    const [tx1] = useState(t1)
    const [tx2] = useState(t2)

    const tax:any = () => {
        return Math.floor(price * (1.0 + tx1 / 100))
    }
    const reduced:any = () => {
        return Math.floor(price * (1.0 + tx2 / 100))
    }
    return [price, tax, reduced, setPrice]
}
// const useCalc = (num:number = 0, func = (a:number) => {return a}) => {
//     const [msg, setMsg] = useState(null)
//     const setValue = (p:number) => {
//         let res = func(p)
//         setMsg(<p >{p}の結果は、{res}です</p>)
//     }
//     return [msg, setValue]
// }

const AlertMessage: React.FC = () => {
    // counterにはnumが入り、plusにはcount()が入っている
    const [counter, plus] = useCounter()
    // console.log(useCounter())
    // console.log(useState())
    
    const [price, tax, reduced, setPrice] = useTax(10, 8)
    const DoChange = (e:any) => {
        setPrice(e.target.value)
    }
    
    return (
        <div>
            <div>
                <h4>count: {counter}</h4>
                <button onClick={plus}>count</button>
            </div>
            <div>
                <p>通常税率：{tax()}円</p>
                <p>通常税率：{reduced()}円</p>
                <div>
                    <label htmlFor='price'>Price:</label>
                    <input type="number" onChange={DoChange} value={price} id='price'/>
                </div>
            </div>
        </div>
    )
}

const Hoge: React.FC = () => {
    const [num, setNum] = useState<number>(0)
    const [msg, setMsg] = useState<string>('set a number')
    const [sample, setSample] = useState<string>('sample')
    const handleNumberChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setNum(Number(e.target.value))
    }
    // console.log(practice)
    const classes = useStyles()
    const history = useHistory()
    const link = (path:string):void => {
        history.push(path)
    }

    useEffect(() => {
        // console.log('レンダリング')
        let total = 0
        for (let i = 0; i <= num; i++){
            total += i
        }
        setMsg(`total: ${total}`)
    },[num])
    
    useEffect(() => {
        setSample('変更')
    }, [sample])

    
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                This is Practice Page
                <IconButton onClick={() => link('/')}>
                    <BackspaceIcon />
                </IconButton>
            </div>
            {/* <div>
                <div>Number: {num}</div>
                <div>{msg}</div>
                <div>税込：{Math.floor(num * 1.1)}</div>
                <div>{sample}</div>
                <div className={classes.inputBase}>
                    <InputBase 
                        className={classes.inputArea} 
                        type='number' 
                        placeholder='number'
                        onChange={handleNumberChange}
                    />
                </div>
            </div> */}
            <div>
                <AlertMessage/>
            </div>
        </div>
    )
}



export default Hoge
