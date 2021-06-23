import React from 'react'
import { useHistory } from 'react-router-dom'
import PrimaryBtn from '../components/PrimaryBtn'
import { makeStyles } from '@material-ui/core/styles';
import NoMessage from '../components/NoMessage';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    margin: '20% auto',
    marginBottom: 100,
  },
  btn: {
      textAlign: 'center',
  }

}))
const OrderFinished:React.FC = () => {
    const classes = useStyles()
    const history = useHistory()
    const link = (path: string):void => {
        history.push(path)
    }
    return (
        <div className={classes.root}>
            <NoMessage label='決済完了' />
            <p>この度は当サイトをご利用いただき、ありがとうございました。またのご利用をお待ちしております。</p>
            <div className={classes.btn} >
                <PrimaryBtn 
                    label='ホームへ' 
                    onClick={() => link('/')} 
                />
            </div>
        </div>
    )
}

export default OrderFinished
