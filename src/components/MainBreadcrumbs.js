import React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import modeNames from '../constants/modeNames';

const MainBreadcrumbs = ({props}) => {
  const state = useSelector(state => state);

  if (state.mode.current === modeNames.ANALYSIS) {
    return (
      <Typography style={{color:"#404040"}} variant="h6" component="div">
        Analysis board
      </Typography>
    );
  } else if (state.mode.current === modeNames.GRANDMASTER) {
    return (
      <Typography style={{color:"#404040"}} variant="h6" component="div">
        Like a grandmaster
      </Typography>
    );
  } else if (state.mode.current === modeNames.LOADFEN) {
    return (
      <Typography style={{color:"#404040"}} variant="h6" component="div">
        FEN board
      </Typography>
    );
  } else if (state.mode.current === modeNames.LOADPGN) {
    return (
      <Typography style={{color:"#404040"}} variant="h6" component="div">
        PGN board
      </Typography>
    );
  } else if (state.mode.current === modeNames.PLAYFRIEND) {
    return (
      <Typography style={{color:"#404040"}} variant="h6" component="div">
        Invited friend
      </Typography>
    );
  }

  return null;
}

export default MainBreadcrumbs;
