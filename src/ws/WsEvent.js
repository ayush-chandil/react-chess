import jwt_decode from "jwt-decode";
import store from '../app/store';
import * as modeConst from '../common/constants/mode';
import Pgn from '../common/Pgn';
import Dispatcher from '../common/Dispatcher';
import * as board from '../features/boardSlice';
import * as heuristicsBar from '../features/heuristicsBarSlice';
import * as mode from '../features/modeSlice';
import * as infoAlert from '../features/alert/infoAlertSlice';
import * as acceptDrawDialog from '../features/dialog/acceptDrawDialogSlice';
import * as acceptRematchDialog from '../features/dialog/acceptRematchDialogSlice';
import * as acceptTakebackDialog from '../features/dialog/acceptTakebackDialogSlice';
import * as heuristicsDialog from '../features/dialog/heuristicsDialogSlice';
import * as playOnlineDialog from '../features/dialog/playOnlineDialogSlice';
import * as progressDialog from '../features/dialog/progressDialogSlice';
import * as gameTable from '../features/table/gameTableSlice';
import WsAction from './WsAction';

export default class WsEvent {
  static onStartAnalysis = () => dispatch => {
    dispatch(mode.startAnalysis({}));
  }

  static onStartGm = (data) => dispatch => {
    dispatch(mode.setGm({
      color: data['/start'].color,
      movetext: null
    }));
  }

  static onStartFen = (data) => dispatch => {
    if (data['/start'].fen) {
      dispatch(mode.startFen());
      dispatch(board.startFen({ fen: data['/start'].fen }));
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(mode.startUndefined());
      dispatch(infoAlert.show({
        info: 'Invalid FEN, please try again with a different one.'
      }));
    }
  }

  static onStartPgn = (data) => dispatch => {
    if (data['/start'].movetext) {
      dispatch(mode.startPgn());
      dispatch(board.startPgn({
        turn: data['/start'].turn,
        movetext: data['/start'].movetext,
        fen: data['/start'].fen,
        history: data['/start'].history
      }));
      Dispatcher.openingAnalysisBySameMovetext(dispatch, data['/start'].movetext);
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(mode.startUndefined());
      dispatch(infoAlert.show({
        info: 'Invalid PGN movetext, please try again with a different one.'
      }));
    }
  }

  static onStartPlay = (data) => dispatch => {
    Dispatcher.initGui(dispatch);
    const jwtDecoded = jwt_decode(data['/start'].jwt);
    dispatch(mode.setPlay({
      jwt: data['/start'].jwt,
      jwt_decoded: jwtDecoded,
      hash: data['/start'].hash,
      color: jwtDecoded.color,
      takeback: null,
      draw: null,
      resign: null,
      rematch: null,
      leave: null,
      accepted: false,
      timer: {
        expiry_timestamp: null,
        over: null
      }
    }));
    if (jwtDecoded.color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
    }
    dispatch(infoAlert.show({ info: 'Waiting for player to join...' }));
    dispatch(board.start());
  }

  static onStartStockfishByColor = (data) => dispatch => {
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
      WsAction.stockfish(store.getState());
    }
  }

  static onStartStockfishByFen = (data) => dispatch => {
    dispatch(board.startFen({ fen: data['/start'].fen }));
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
    }
    WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
  }

  static onAccept = (data) => dispatch => {
    Dispatcher.initGui(dispatch);
    if (data['/accept'].jwt) {
      if (!store.getState().mode.play) {
        const jwtDecoded = jwt_decode(data['/accept'].jwt);
        const color = jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
        dispatch(board.start());
        dispatch(mode.setPlay({
          jwt: data['/accept'].jwt,
          jwt_decoded: jwt_decode(data['/accept'].jwt),
          hash: data['/accept'].hash,
          color: color,
          takeback: null,
          draw: null,
          resign: null,
          rematch: null,
          leave: null,
          accepted: false,
          timer: {
            expiry_timestamp: null,
            over: null
          }
        }));
      }
      if (store.getState().mode.play.color === Pgn.symbol.BLACK) {
        dispatch(board.flip());
      }
      dispatch(mode.acceptPlay());
      dispatch(playOnlineDialog.close());
    } else {
      dispatch(mode.startUndefined());
      dispatch(infoAlert.show({
        info: 'Invalid invite code, please try again with a different one.'
      }));
    }
  }

  static onOnlineGames = (data) => dispatch => {
    dispatch(playOnlineDialog.refresh(data['/online_games']));
  }

  static onLegalSqs = (data) => dispatch => {
    dispatch(board.legalSqs({
      piece: data['/legal_sqs'].identity,
      position: data['/legal_sqs'].position,
      sqs: data['/legal_sqs'].sqs,
      en_passant: data['/legal_sqs'].enPassant ? data['/legal_sqs'].enPassant : ''
    }));
  }

  static onPlayfen = (props, data) => dispatch => {
    const payload = {
      isCheck: data['/play_fen'].isCheck,
      isMate: data['/play_fen'].isMate,
      movetext: data['/play_fen'].movetext,
      fen: data['/play_fen'].fen
    };
    if (data['/play_fen'].isLegal) {
      if (data['/play_fen'].pgn === Pgn.symbol.CASTLING_LONG) {
        dispatch(board.castleLong(payload));
      } else if (data['/play_fen'].pgn === Pgn.symbol.CASTLING_SHORT) {
        dispatch(board.castleShort(payload));
      } else {
        dispatch(board.validMove(payload));
      }
      if (store.getState().mode.name === modeConst.ANALYSIS) {
        Dispatcher.openingAnalysisByMovetext(dispatch, payload.movetext);
      } else if (store.getState().mode.name === modeConst.GM) {
        dispatch(infoAlert.close());
        dispatch(progressDialog.open());
        fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/grandmaster`, {
          method: 'POST',
          body: JSON.stringify({
            movetext: data['/play_fen'].movetext
          })
        }).then(res => {
          if (res.status === 200) {
            res.json().then(data => {
              const game = data[0];
              dispatch(mode.setGm({
                color: Pgn.symbol.WHITE,
                movetext: game.movetext
              }));
              dispatch(gameTable.show({
                game: {
                  Event: game.Event,
                  Site: game.Site,
                  Date: game.Date,
                  White: game.White,
                  Black: game.Black,
                  'White ELO': game.WhiteElo,
                  'Black ELO': game.BlackElo,
                  Result: game.Result,
                  ECO: game.ECO
                }
              }));
            });
          } else if (res.status === 204) {
            dispatch(gameTable.close());
            dispatch(infoAlert.show({
              info: 'This game was not found in the database, please try again with a different one.'
            }));
          }
        })
        .catch(error => {
          dispatch(infoAlert.show({ info: 'Whoops! Something went wrong, please try again.' }));
        })
        .finally(() => {
          dispatch(progressDialog.close());
        });
      } else if (store.getState().mode.name === modeConst.STOCKFISH) {
        dispatch(progressDialog.open());
        WsAction.stockfish(store.getState());
      }
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    }
  }

  static onHeuristics = (data) => dispatch => {
    dispatch(heuristicsDialog.open({
      dimensions: data['/heuristics'].dimensions,
      balance: data['/heuristics'].balance
    }));
  }

  static onHeuristicsBar = (data) => dispatch => {
    dispatch(heuristicsBar.updateBar({
      dimensions: data['/heuristics_bar'].dimensions,
      balance: data['/heuristics_bar'].balance
    }));
  }

  static onTakebackPropose = () => dispatch => {
    if (!store.getState().mode.play.takeback) {
      dispatch(acceptTakebackDialog.open());
    }
  }

  static onTakebackAccept = () => dispatch => {
    dispatch(mode.acceptTakeback());
  }

  static onDrawPropose = () => dispatch => {
    if (!store.getState().mode.play.draw) {
      dispatch(acceptDrawDialog.open());
    }
  }

  static onDrawAccept = () => dispatch => {
    dispatch(mode.acceptDraw());
    dispatch(infoAlert.show({ info: 'Draw offer accepted.' }));
  }

  static onDrawDecline = () => dispatch => {
    dispatch(mode.declineDraw());
    dispatch(infoAlert.show({ info: 'Draw offer declined.' }));
  }

  static onUndo = (data) => dispatch => {
    dispatch(board.undo(data['/undo']));
    if (data['/undo'].mode === modeConst.PLAY) {
      dispatch(mode.declineTakeback());
    } else if (data['/undo'].mode === modeConst.ANALYSIS) {
      Dispatcher.openingAnalysisByMovetext(dispatch, data['/undo'].movetext);
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    }
  }

  static onResignAccept = () => dispatch => {
    dispatch(mode.acceptResign());
    dispatch(infoAlert.show({ info: 'Chess game resigned.' }));
  }

  static onRematchPropose = () => dispatch => {
    if (!store.getState().mode.play.rematch) {
      dispatch(acceptRematchDialog.open());
    }
  }

  static onRematchAccept = () => dispatch => {
    dispatch(mode.acceptRematch());
    dispatch(infoAlert.show({ info: 'Rematch accepted.' }));
  }

  static onRematchDecline = () => dispatch => {
    dispatch(mode.declineRematch());
    dispatch(infoAlert.show({ info: 'Rematch declined.' }));
  }

  static onLeaveAccept = () => dispatch => {
    dispatch(mode.acceptLeave());
    dispatch(infoAlert.show({ info: 'Your opponent left the game.' }));
  }

  static onRestart = (data) => dispatch => {
    const jwtDecoded = jwt_decode(data['/restart'].jwt);
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + parseInt(jwtDecoded.min) * 60);
    dispatch(mode.setPlay({
      color: store.getState().mode.play.color,
      accepted: false
    }));
    dispatch(mode.setPlay({
      jwt: data['/restart'].jwt,
      jwt_decoded: jwtDecoded,
      hash: data['/restart'].hash,
      color: store.getState().mode.play.color,
      takeback: null,
      draw: null,
      resign: null,
      rematch: null,
      accepted: true,
      timer: {
        expiry_timestamp: expiryTimestamp,
        over: null
      }
    }));
    dispatch(board.start());
    if (store.getState().mode.play.color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
    }
  }

  static onRandomCheckmate = (data) => dispatch => {
    if (data['/random_checkmate'].fen) {
      dispatch(mode.setStockfish({
        color: data['/random_checkmate'].turn,
        options: {
          "Skill Level": 20
        },
        params: {
          "depth": 12
        }
      }));
      WsAction.startStockfishByFen(store.getState(), data['/random_checkmate'].fen);
    } else {
      dispatch(mode.startUndefined());
      dispatch(infoAlert.show({ info: 'Whoops! A random checkmate could not be loaded.' }));
    }
  }

  static onStockfish = (data) => dispatch => {
    if (data['/stockfish']) {
      dispatch(board.gm({
        turn: data['/stockfish'].state.turn,
        isCheck: data['/stockfish'].state.isCheck,
        isMate: data['/stockfish'].state.isMate,
        movetext: data['/stockfish'].state.movetext,
        fen: data['/stockfish'].state.fen
      }));
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
      Dispatcher.openingAnalysisByMovetext(dispatch, data['/stockfish'].state.movetext);
    }
  }

  static onValidate = (data) => dispatch => {
    Dispatcher.initGui(dispatch);
    if (data['validate']) {
      dispatch(mode.startUndefined());
      dispatch(infoAlert.show({
        info: 'Whoops! Something went wrong, please try again with different data.'
      }));
    }
  }
}
