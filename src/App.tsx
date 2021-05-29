import React from 'react';
// import logo from './logo.svg';
import './App.css';

import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AppMenu from './components/appMenue/AppMenu'
import { ImageVison } from './components/imagevision/ImageVison';
import { ObjectDetection } from './components/imagevision/ObjectDetection';
import TfImageTutorial from './components/imagevision/TfImageTutorial';

const App: React.FC = () => {
  const classes = useStyles();
  
  const [showDrawer, setShowDrawer] = React.useState(false);

  const toggleDrawer = (open: boolean) => 
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setShowDrawer(open);
  };

  return (
    <div className={clsx('App', classes.root)}>
    <Router>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            React ML Testing application
          </Typography>
        </Toolbar>
        </AppBar>


        <Drawer
          variant='temporary'
          open={showDrawer}
          onClose={toggleDrawer(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <AppMenu />
        </Drawer>
          

      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>

        
      
     
          {/* <Typography>I'm the content a</Typography> */}
          <Switch>
          <Route exact path="/">
            Image Object Detection 
            <ObjectDetection />
          </Route>
          <Route path="/imagevision">
            Image Vision 
            <ImageVison />
          </Route>
          <Route path="/objectdetection">
            Image Object Detection 
            <ObjectDetection />
          </Route>
          <Route path="/smartcamera">
            Camera detection 
            <TfImageTutorial />
          </Route>
        </Switch>

        </Container>
      </main>
    </Router>   
    </div>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: '#535454',
    color: '#fff',
  },
  content: {
    marginTop: '40px',
    flexGrow: 1,
    height: '100vh',
    overflow: 'none',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - 0px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
  }
}))



export default App;
