import React, { useState} from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {  asyncOrder, orderType, carts, UserState } from '../features/users/userSlice'
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import PrimaryBtn from '../components/PrimaryBtn'
import { Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import axios from 'axios'
import 'date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
      fontWeight: 'bold'
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
  link: {
    textDecoration: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    textAlign: 'left',
  },
  formTitle: {
    margin: theme.spacing(1),
    fontSize: 30,
    textAlign: 'center',
  },
  validation: {
      color: 'red',
      fontSize: 15
  },
  container: {
      marginLeft: 'auto',
      marginRight: 'auto',
  },
  formContainer: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
  },
  textField: {
      width: 400
  },
  addressBtn: {
      marginLeft: 30,
      fontSize: 16,
      height: 40,
  },
  base: {
      verticalAlign: 'bottom'
  },
  bottom: {
      marginBottom: 15,
  },
  top: {
      marginTop: 25,
  },
  orderConfirmTitle: {
      marginTop: 30,
      fontSize: 30,
  }
}));

const Cart: React.FC = () => {    
    const dispatch = useAppDispatch()
    const classes = useStyles()
    const cart:UserState['cart'] = useAppSelector(state => state.user.cart)
    const totalPrice:number[] = cart.map(item => item.price * item.quantity + item.toppingTotal)
    const orderTotalPrice:number = totalPrice.reduce((a:number, b:number) => a + b, 0)
    const history = useHistory()
    const link = (path: string):void => {
        history.push(path)
    }
    const { register, handleSubmit, formState: {errors} } = useForm()
    const uid:string | undefined = useAppSelector(state => state.user.userInfo.uid)

    const onSubmit = (data: orderType):void => {
        const date:string = new Date().toLocaleDateString()
     if(window.confirm('???????????????????????????????????????????????????')){
         dispatch(asyncOrder(
             {userOrderInfo: {
                 orderAddress: data.orderAddress,
                 orderDate: data.orderDate,
                 orderEmail: data.orderEmail,
                 orderName: data.orderName,
                 orderTel: data.orderTel,
                 orderTime: data.orderTime,
                 orderTimePoint: date,
                 orderZipcode: data.orderZipcode,
                 paymentMethod: data.paymentMethod,
                 orderTotalPrice: orderTotalPrice,
             } as orderType, userCart: cart as carts, uid: uid}
         ))
         history.push('/order/finished')
     } else {
        alert('???????????????????????????????????????')
     }
    }

    const [zipcode, setZipcode] = useState<string>('')
    const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setZipcode(e.target.value)
    }
    
    const [address, setAddress] = useState<string>('')
    const handleAddress = (e: React.ChangeEvent<HTMLInputElement>):void => setAddress(e.target.value)

    //????????????
    const getAddress = ():void => {
        axios.get(`https://api.zipaddress.net/?zipcode=${zipcode}`)
        .then(res =>{
            if(res.data.data){
                const fullAddress = res.data.data.fullAddress
                setAddress(fullAddress) 
            }
        })
    }
    
    // ????????????
    const [orderTime, setOrderTime] = useState<number>(1)
    const handleChangeOrderTime = (e:any):void => {
        setOrderTime(e.target.value)        
    }

    // ??????????????????
    const [paymentMethod, setPaymentMethod] = useState<number>(1)
    const handleChangePaymentMethod = (e:React.ChangeEvent<{ name?: string | undefined; value: unknown; }>):void => {
        setPaymentMethod(Number(e.target.value))
    }

    return (
        <div className={classes.root}>
            <div className={classes.orderConfirmTitle}>????????????</div>
            {cart.length === 0 ?
                <h2>???????????????????????????????????????</h2>
                :
                <div>
                {cart.map((item) => 
                    <Card 
                        key={item.cartId}
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
                                                ?????????
                                            </span>
                                            <span>
                                                ??{item.price}
                                            </span>
                                        </div>
                                        <div>
                                            <span className={classes.bold}>
                                                ?????????
                                            </span>
                                            <span>
                                                {item.quantity}
                                            </span>
                                        </div>

                                        <div>
                                            <span className={classes.bold}>
                                                ????????????
                                            </span>
                                            <span>
                                                {item.size}
                                            </span>
                                            <div>
                                                <div className={classes.bold}>
                                                    ???????????????
                                                </div>
                                                {item.topping.length !== 0 ?

                                                item.topping.map(t => 
                                                    <div>???{t.toppingName}???{t.toppingSize}???</div>   
                                                    )
                                                    :
                                                    <span>??????</span>
                                                }
                                            </div>
                                        </div>

                                        <div>
                                            <span className={classes.bold}>????????????????????????</span>
                                            <span>??{item.toppingTotal}</span>
                                        </div>

                                        <hr/>
                                        <div className={classes.total}>
                                            ???????????{item.price * item.quantity + item.toppingTotal}
                                        </div>
                                        <hr/>

                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                    
                )}
            
            <hr/>
            <div className={classes.resultContainer}>
                <Typography className={classes.preResultText}>???????????{orderTotalPrice}</Typography>
                <Typography className={classes.preResultText}>??????????????{Math.floor(orderTotalPrice * 0.1)}</Typography>
                <Typography className={classes.resultText}>???????????????????????{Math.floor(orderTotalPrice * 1.1)}</Typography>
            </div>
          
            <hr/>

        {/* ?????????????????? */}
        <div className={classes.formContainer}>
        
        <Typography className={classes.formTitle}>????????????</Typography>
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className={classes.formControl}
        >
            {/* ?????? */}
            <div>
                <TextField {...register('orderName', {required: true})} label="?????????" />
                <div className={classes.validation}>
                    {errors.orderName?.type === 'required' && '????????????????????????????????????'}
                </div>
            </div>

            {/* ???????????? */}
            <div>
                <TextField {...register('orderTel', {required: true, pattern: /\d{1,4}-\d{1,4}-\d{1,4}$/})} label="????????????" />
                <div className={classes.validation}>
                    {errors.orderTel?.type === 'required' && '???????????????????????????????????????'}
                    {errors.orderTel?.type === 'pattern' && '???????????????xxxx-xxxx-xxxx????????????????????????????????????'}
                </div>
            </div>

            {/* ????????????????????? */}
            <div>
                <TextField {...register('orderEmail', {required: true, validate: value => value.indexOf('@') !== -1 })} label="?????????????????????" />

                <div className={classes.validation}>
                    {errors.orderEmail?.type === 'required' && '????????????????????????????????????????????????'}
                    {errors.orderEmail?.type === 'validate' && '??????????????????????????????????????????????????????????????????@?????????????????????????????????'}
                </div>
            </div>

            {/* ???????????? */}
            <div className={classes.base}>
                <TextField 
                    label="????????????" {...register('orderZipcode', {required: true, pattern: /^\d{3}-\d{4}$/})} 
                    onChange={handleZipChange}
                    value={zipcode}
                >
                </TextField>

                <PrimaryBtn label='????????????' onClick={() => getAddress()} className={classes.addressBtn}></PrimaryBtn>

                <div className={classes.validation}>
                    {errors.orderZipcode?.type === 'required' && '???????????????????????????????????????????????????????????????'}
                    {errors.orderZipcode?.type === 'pattern' && '???????????????xxx-xxxx????????????????????????????????????'}
                </div>
            </div>

            {/* ?????? */}
            <div>
                <TextField 
                    {...register('orderAddress', {required: true})} label="??????" 
                    value={address} 
                    onChange={handleAddress}  
                    className={classes.textField}
                    />
                <div 
                    className={classes.validation}
                    >
                    {errors.orderAddress?.type === 'required' && '?????????????????????????????????'}
                </div>
            </div>

            {/* ????????? */}
            <div>
                <TextField {...register('orderDate', {required: true, pattern: /\d{2}\/\d{2}\/\d{4}/})} label="?????????" />
                <div className={classes.validation}>
                    {errors.orderDate?.type === 'required' && '????????????????????????????????????'}
                    {errors.orderDate?.type === 'pattern' && '???????????????MM/DD/YYYY?????????????????????????????????'}
                </div>
            </div>
            
            {/* ???????????? */}
            <div className={classes.bottom + ' ' + classes.top}>
                <InputLabel>????????????</InputLabel>
                <Select
                    value={orderTime}
                    {...register('orderTime')}
                    onChange={handleChangeOrderTime}
                >
                    <MenuItem value={1}>9-11???</MenuItem>
                    <MenuItem value={2}>12-14???</MenuItem>
                    <MenuItem value={3}>15-17???</MenuItem>
                    <MenuItem value={4}>18-20???</MenuItem>
                    <MenuItem value={5}>21-23???</MenuItem>
                </Select>
            </div>

            {/* ?????????????????? */}
            <div className={classes.bottom}>
                <InputLabel>??????????????????</InputLabel>
                <Select
                    {
                        ...register('paymentMethod')
                        // {required: true})
                    }
                    onChange={handleChangePaymentMethod}
                    value={paymentMethod}
                    // defaultValue= {1}
                >
                    <MenuItem value={1}>?????????</MenuItem>
                    <MenuItem value={2}>????????????????????????</MenuItem>
                    
                </Select>
                {paymentMethod === 2 &&
                    <div>
                        <TextField 
                            {
                                ...register('creditNumber', 
                                {required: true, pattern: /\d{1,4}-\d{1,4}-\d{1,4}-\d{1,4}$/})
                            } 
                            label='??????????????????????????????'
                        />
                        <div className={classes.validation}>
                            {errors.creditNumber?.type === 'required' && '?????????????????????????????????????????????????????????'}
                            {errors.creditNumber?.type === 'pattern' && '?????????????????????????????????xxxx-xxxx-xxxx-xxxx????????????????????????????????????'}
                        </div>
                    </div>
                }
            </div>

            <PrimaryBtn 
                onClick={handleSubmit(onSubmit)} 
                type='submit' 
                label='???????????????????????????' 
            />
        </form>
        </div>

        </div>
        }
        <div className={classes.linkBtnContainer}>
            <PrimaryBtn 
                className={classes.linkBtn}
                onClick={() => link('/cart')}
                label='????????????'
            />
        </div>
        </div>
    )
}

export default Cart
