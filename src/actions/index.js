export const UPDATE_STATS = 'UPDATE_STATS';
export const SET_PAN_STATE = 'SET_PAN_STATE';
export const SET_SWIPE_STATE = 'SET_SWIPE_STATE';
export const GET_NEW_CARD = 'GET_NEW_CARD';
export const CHECK_GAME_OVER = 'CHECK_GAME_OVER';
export const DISMISS_TUTORIAL = 'DISMISS_TUTORIAL';
export const RESTART_GAME = 'RESTART_GAME';

export const getNewCard = () => ({ type: GET_NEW_CARD });

export const updateStats = stats =>
    ({
        type: UPDATE_STATS,
        stats,
    });

export const setPanState = (isPanLeft, isPanRight) =>
    ({
        type: SET_PAN_STATE,
        isPanLeft,
        isPanRight,
    });

export const setSwipeState = isSwiped => ({
    type: SET_SWIPE_STATE,
    isSwiped,
});

export const checkGameOver = () => ({ type: CHECK_GAME_OVER });
export const dismissTutorial = () => ({ type: DISMISS_TUTORIAL });
export const restartGame = () => ({ type: RESTART_GAME });
