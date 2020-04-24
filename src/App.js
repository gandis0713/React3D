import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

import { Switch, Redirect, Route, Link as RouterLink } from 'react-router-dom';

import Triangle from './component/Basic/Triangle/Triangle'
import TriangleInClipSpace from './component/Basic/TriangleInClipSpace/TriangleInClipSpace'
import ObjectOrientation from './component/Basic/ObjectOrientation'
import CameraOrbit from './component/Basic/CameraOrbit'
import FrameBufferRendering from './component/Basic/FrameBufferRendering'
import DirectionLight from './component/Basic/DirectionLight'
import Magnifier from './component/ImageEffect/Magnifier'
import Sharpening from './component/ImageEffect/Sharpening'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar
}));

function App() {

  const classes = useStyles();
  const [imageEffectExpand, setImageEffectExpand] = useState(false);
  const [basicExpand, setBasicExpand] = useState(false);
  const [meshExpand, setMeshExpand] = useState(false);

  const onExpandBasic = (event) => {
    event.preventDefault();
    setBasicExpand(!basicExpand);
  };
  const onExpandImageEffect = (event) => {
    event.preventDefault();
    setImageEffectExpand(!imageEffectExpand);
  };
  const onExpandMesh = (event) => {
    event.preventDefault();
    setMeshExpand(!meshExpand);
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar  position="fixed"  className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              WebGL Tutorial
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <Divider />
          <List        
            subheader={
            <ListSubheader>
              Basic
              <IconButton onClick={onExpandBasic}>
                {basicExpand ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListSubheader>
          }>
            <Collapse in={basicExpand} timeout="auto" unmountOnExit={false}>
              <ListItem button key={0} component={RouterLink} to="/Triangle">
                Triangle
              </ListItem>
              <ListItem button key={1} component={RouterLink} to="/TriangleInClipSpace">
                TriangleInClipSpace
              </ListItem>
              <ListItem button key={2} component={RouterLink} to="/ObjectOrientation">
                Object Orientation
              </ListItem>
              <ListItem button key={3} component={RouterLink} to="/CameraOrbit">
                Camera Orbit
              </ListItem>
              <ListItem button key={4} component={RouterLink} to="/FrameBufferRendering">
                FrameBuffer Rendering
              </ListItem>
              <ListItem button key={5} component={RouterLink} to="/DirectionLight">
                Direction Light
              </ListItem>
            </Collapse>
          </List>
          <Divider />
          <List        
            subheader={
            <ListSubheader>
              Image Effect
              <IconButton onClick={onExpandImageEffect}>
                {imageEffectExpand ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListSubheader>
          }>
            <Collapse in={imageEffectExpand} timeout="auto" unmountOnExit={false}>
              <ListItem button key={0} component={RouterLink} to="/Magnifier">
                Magnifier
              </ListItem>
              <ListItem button key={1} component={RouterLink} to="/Sharpening">
                Sharpening
              </ListItem>
            </Collapse>
          </List>
          <Divider />
        </Drawer>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/Triangle" component={Triangle}/>
            <Route exact path="/TriangleInClipSpace" component={TriangleInClipSpace}/>
            <Route exact path="/ObjectOrientation" component={ObjectOrientation}/>
            <Route exact path="/CameraOrbit" component={CameraOrbit}/>
            <Route exact path="/FrameBufferRendering" component={FrameBufferRendering}/>
            <Route exact path="/DirectionLight" component={DirectionLight}/>
            <Route exact path="/Magnifier" component={Magnifier}/>
            <Route exact path="/Sharpening" component={Sharpening}/>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
