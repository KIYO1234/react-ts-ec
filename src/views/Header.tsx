import React, { useState } from 'react'
import { UserState } from '../features/users/userSlice'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { deleteUser } from '../features/users/userSlice'
import Badge from '@material-ui/core/Badge';
import { ShoppingCart } from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import PrimaryBtn from '../components/PrimaryBtn';
import HistoryIcon from '@material-ui/icons/History';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: 20,
    },
    right: {
      position: 'absolute',
      right: 10,
    },
    homeIcon: {
      position: 'absolute',
      right: 290,
    },
    cartIcon: {
      position: 'absolute',
      right: 240
    },
    historyBtn: {
      position: 'absolute',
      right: 125
    },
    toolBar: {
      position: 'relative',
    },
    marginLeft: {
      marginLeft: 'auto'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
}));


const Header: React.FC = () => {
    const history = useHistory()
    const link = (path: string) => {
        history.push(path)
    }
    const user:UserState = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const classes = useStyles();
    const login = async ():Promise<void> => {
        const google_auth_provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithRedirect(google_auth_provider);
        alert('ログインしました')
    }
    const logout = ():void => {
      if(window.confirm('ログアウトしますか？')){
        firebase.auth().signOut()
        dispatch(deleteUser())
        alert('ログアウトしました')
        history.push('/')
      } else {
        alert('ログアウトがキャンセルされました')
      } 
    }
    const cart:UserState['cart'] = useAppSelector(state => state.user.cart)
    const [open, setOpen] = useState<boolean>(false)
    const handleDrawerOpen = ():void => {
      setOpen(true)
    }
    const handleDrawerClose = ():void => {
      setOpen(false)
    }

  return (
    <div className={classes.root}>
      <Drawer
        open={open}
        variant='persistent'
        anchor='left'  
      >
        <div className={classes.marginLeft}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem 
              button
              onClick={() => link('/')}
            >
                  <ListItemIcon>
                    <HomeIcon></HomeIcon>
                  </ListItemIcon>
                  <ListItemText>ホーム</ListItemText>
            </ListItem>
            <ListItem 
              button
              onClick={() => link('/cart')}
            >
                  <ListItemIcon>
                    <ShoppingCart></ShoppingCart>
                  </ListItemIcon>
                  <ListItemText>カート</ListItemText>
            </ListItem>
            <ListItem 
              button
              onClick={() => link('/order/history')}
            >
                  <ListItemIcon>
                    <HistoryIcon></HistoryIcon>
                  </ListItemIcon>
                  <ListItemText>注文履歴</ListItemText>
            </ListItem>
        </List>
      </Drawer>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <IconButton 
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>

          <Hidden xsDown>
            {user.userInfo.isSignedIn ? 
              <Typography variant="h6" className={classes.title}>
                  <div>Welcome!</div>
                  <div>{user.userInfo.displayName}</div>
              </Typography>
              :
              <Typography variant="h6" className={classes.title}>
                  ログインしていません
              </Typography>
            }
            <IconButton
              color='inherit'
              className={classes.homeIcon}
              onClick={() => link('/')}  
            >
              <HomeIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              className={classes.cartIcon}
              onClick={() => link('/cart')}
            >
              <Badge 
                badgeContent={cart.length} color="secondary"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
            
          </Hidden>
          <Hidden xsDown>
            <PrimaryBtn label='注文履歴' className={classes.historyBtn} onClick={() => link('/order/history')}/>
          </Hidden>
          <Typography className={classes.right}>
            {!user.userInfo.isSignedIn ?
              <PrimaryBtn label='Login' onClick={login}></PrimaryBtn >
              :
              <PrimaryBtn  label='Logout' onClick={logout}></PrimaryBtn >
            }
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header