import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'

import IconDashboard from '@material-ui/icons/Dashboard'
import IconBarChart from '@material-ui/icons/BarChart'

import AppMenuItem from './AppMenuItem'

const appMenuItems = [
  {
    name: 'Home',
    link: '/',
    Icon: IconDashboard,
  },
  {
    name: 'Mobile Net Model',
    link: '/imagevision',
    Icon: IconBarChart,
  },
  {
    name: 'TF Object Detection',
    link: '/objectdetection',
    Icon: IconDashboard,
  },
 
]

const AppMenu: React.FC = () => {
  const classes = useStyles()
  
  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </List>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)

export default AppMenu
