import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import Pgn from '../../common/Pgn';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as createInviteCodeDialog from '../../features/dialog/createInviteCodeDialogSlice';
import SelectColorButtons from '../../features/dialog/SelectColorButtons';
import * as modeConst from '../../features/mode/modeConst';
import * as variantConst from '../../features/variant/variantConst';
import WsAction from '../../features/ws/WsAction';

const Chess960 = () => {
  return <TextField
    fullWidth
    required
    name="startPos"
    label="Start position"
    helperText="Examples of starting positions: RNBQKBNR, RBBKRQNN, NRKNBBQR, etc."
  />;
}

const CreateInviteCodeDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <Dialog open={state.createInviteCodeDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Play a Friend
        <IconButton onClick={() => dispatch(createInviteCodeDialog.close())}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {state.mode.play && state.mode.play.hash ? <CopyCode /> : <CreateCode />}
    </Dialog>
  );
}

const CreateCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [fields, setFields] = React.useState({
    minutes: 5,
    increment: 3,
    color: 'rand',
    variant: variantConst.CLASSICAL,
    fen: '',
  });

  const handleMinutesChange = (event: Event) => {
    setFields({
      ...fields,
      minutes: event.target.value
    });
  };

  const handleIncrementChange = (event: Event) => {
    setFields({
      ...fields,
      increment: event.target.value
    });
  };

  const handleVariantChange = (event: Event) => {
    setFields({
      ...fields,
      variant: event.target.value
    });
  };

  const handleFenChange = (event: Event) => {
    setFields({
      ...fields,
      fen: event.target.value
    });
  };

  const handleCreateCode = () => {
    dispatch(mainButtons.setPlayAFriend());
    let settings = {
      min: fields.minutes,
      increment: fields.increment,
      color: fields.color === 'rand'
        ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
        : fields.color,
      submode: 'friend'
    };
    fields.fen ? settings.fen = fields.fen : null;
    WsAction.start(state, fields.variant, modeConst.PLAY, { settings: JSON.stringify(settings) });
  }

  return (
    <DialogContent>
      <Typography
        id="input-minutes"
        align="center"
        gutterBottom
      >
        Minutes per side
      </Typography>
      <Slider
        name="min"
        aria-label="Minutes"
        defaultValue={5}
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={60}
        onChange={handleMinutesChange}
      />
      <Typography
        id="input-increment"
        align="center"
        gutterBottom
      >
        Increment in seconds
      </Typography>
      <Slider
        name="increment"
        aria-label="Increment"
        defaultValue={3}
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={60}
        onChange={handleIncrementChange}
      />
      <Grid container justifyContent="center">
        <SelectColorButtons props={fields} />
      </Grid>
      <TextField
        fullWidth
        name="fen"
        label="FEN string"
        margin="normal"
        onChange={handleFenChange}
      />
      <TextField
        select
        fullWidth
        name="variant"
        label="Select a variant"
        defaultValue={variantConst.CLASSICAL}
        margin="normal"
        onChange={handleVariantChange}
        >
        <MenuItem key={0} value="classical">
          Classical
        </MenuItem>
        <MenuItem key={1} value="960">
          Fischer Random 960
        </MenuItem>
        <MenuItem key={2} value="capablanca80">
          Capablanca
        </MenuItem>
      </TextField>
      {fields.variant === variantConst.CHESS_960 ? <Chess960 /> : null}
      <Button
        fullWidth
        variant="outlined"
        onClick={() => handleCreateCode()}
      >
        Create Invite Code
      </Button>
    </DialogContent>
  );
}

const CopyCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <DialogContent>
      <TextField
        fullWidth
        type="text"
        name="sharecode"
        label="Share this code with a friend"
        margin="normal"
        value={state.mode.play.hash}
      />
      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          navigator.clipboard.writeText(state.mode.play.hash);
          dispatch(createInviteCodeDialog.close());
      }}>
        Copy and Play
      </Button>
    </DialogContent>
  );
}

export default CreateInviteCodeDialog;
