import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { deleteFromCart, UserState } from '../features/users/userSlice'
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import PrimaryBtn from '../components/PrimaryBtn'
import { Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom";
import NoMessage from '../components/NoMessage';
import firebase from 'firebase'

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    marginBottom: 100, 
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  media: {
    height: 140,
    width: 140,
  },
  grid: {
    margin: '0 auto'
  },
  between: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 30,
      marginBottom: 30,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
  },
  desc: {
      width: 200,
  },
  addBtn: {
      position: 'absolute',
      right: 0,
  },
  flex: {
      display: 'flex'
  },
  linkBtnContainer: {
      width: '60%',
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 40,
  },
  linkBtn: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'right',
  },
  card: {
      marginTop: 30,
      marginBottom: 20,
      width: '80%',
      marginRight: 'auto',
      marginLeft: 'auto',
  },
  bold: {
      fontWeight: 'bold',
      fontSize: 20,
  },
  itemName: {
      fontSize: 25,
      marginBottom: 10,
  },
  total: {
      fontSize: 25,
      fontWeight: 'bold'
  },
  resultContainer: {
      textAlign: 'center',
      margin: 10,
  },
  preResultText: {
    fontSize: 25,
  },
  resultText: {
      fontSize: 30,
      fontWeight: 'bold',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardActionArea: {
      width: 200
  },
  cartTitle: {
      marginTop: 30,
      fontSize: 30,
  },
  subText: {
      fontSize: 20,
  }
}));

const Cart: React.FC = () => {
    const dispatch = useAppDispatch()
    const isSignedIn:boolean = useAppSelector(state => state.user.userInfo.isSignedIn)    
    const classes = useStyles()
    const cart:UserState['cart'] = useAppSelector(state => state.user.cart)
    
    // 合計金額
    const totalPrice:number[] = cart.map(item => item.price * item.quantity + item.toppingTotal)    
    
    const finalPrice:number = totalPrice.reduce((a:number, b:number) => a + b, 0)
    const history = useHistory()
    const link = (path: string):void => {
        history.push(path)
    }

    const local = async(path: string):Promise<void> => {
        if(isSignedIn){
            history.push(path)
        } else {
            const google_auth_provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithRedirect(google_auth_provider);
            alert('ログインしました')
            history.push('/')
        }
    }
    
    return (
        <div className={classes.root}>
            {cart.length === 0 ?
                <NoMessage label='カートの中身はありません' />
                :
                <div className={classes.cartTitle}>
                <div>ショッピングカート</div>
                {cart.map((item, index:number) => 
                    <Card 
                        key={index}
                        className={classes.card} 
                    >
                        <Grid 
                            item xs={8} 
                            className={classes.grid}
                        >
                            <Grid className={classes.between}>
                                <Grid item xs={12}>
                                    <CardMedia 
                                        className={classes.media}
                                        image={item.url} 
                                        />
                                </Grid>
                                <div>
                                    <Grid item xs={12} className={classes.desc}>

                                        <div className={classes.cardActionArea}>
                                            <div className={classes.itemName}>
                                                {item.name}
                                            </div>
                                        </div>

                                        <div>
                                            <span className={classes.bold}>
                                                価格：
                                            </span>
                                            <span className={classes.subText}>
                                                ¥{item.price}
                                            </span>
                                        </div>
                                        <div>
                                            <span className={classes.bold}>
                                                個数：
                                            </span>
                                            <span className={classes.subText}>
                                                {item.quantity}
                                            </span>
                                        </div>

                                        <div>
                                            <span className={classes.bold}>
                                                サイズ：
                                            </span>
                                            <span className={classes.subText}>
                                                {item.size}
                                            </span>
                                            <div>
                                                <div className={classes.bold}>
                                                    トッピング
                                                </div>
                                                {item.topping.length !== 0 ?

                                                    item.topping.map(t => 
                                                    <div 
                                                        key={t.toppingId}
                                                        className={classes.subText}
                                                    >
                                                        ・{t.toppingName}（{t.toppingSize}）
                                                    </div>   
                                                    )
                                                :
                                                    <span>なし</span>
                                                }
                                            </div>
                                        </div>

                                        <div>
                                            <span className={classes.bold}>トッピング合計：</span>
                                            <span className={classes.subText}>¥{item.toppingTotal}</span>
                                        </div>

                                        <hr/>
                                        <div className={classes.total}>
                                            小計：¥{totalPrice[index]}
                                        </div>
                                        <hr/>

                                        <PrimaryBtn
                                            label='削除'
                                            onClick={() => dispatch(deleteFromCart(item.cartId))}
                                        />
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                    
                )}
            
            <hr/>
            <div className={classes.resultContainer}>
                <Typography className={classes.preResultText}>小計：¥{finalPrice}</Typography>
                <Typography className={classes.preResultText}>消費税：¥{Math.floor(finalPrice * 0.1)}</Typography>
                <Typography className={classes.resultText}>最終請求金額：¥{Math.floor(finalPrice * 1.1)}</Typography>
            </div>
            <hr/>
            </div>
            }

            <div className={classes.linkBtnContainer}>
                <PrimaryBtn 
                    className={classes.linkBtn}
                    onClick={() => link('/')}
                    label='商品一覧へ'
                />
                {cart.length > 0 && 
                    <PrimaryBtn 
                        className={classes.linkBtn}
                        onClick={() => local('/order/confirm')}
                        label='注文に進む'
                    />
                }
            </div>
        </div>
    )
}

export default Cart
