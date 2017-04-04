import { sample } from 'lodash';

import * as Actions from '../actions';
import { cards, gameOverCardsMin, gameOverCardsMax } from '../data/cards';
import teamNames from '../data/teamNames';
import { MAX_OLD_CARDS } from '../constants';

const initialState = {
    teamName: sample(teamNames),
    daysInCharge: 1,
    currentCard: sample(cards),
    isPanLeft: false,
    isPanRight: false,
    stats: [0.95, 0.5, 0.5, 0.5],
    isSwiped: false,
    isTutorialShown: false,
    isGameOver: false,
    lastCards: [],
    gameoverText: '',
};

function fmApp(state = initialState, action) {
    switch (action.type) {
    case Actions.UPDATE_STATS:
        return {
            ...state,
            stats: action.stats,
            daysInCharge: state.daysInCharge + 1,
            isSwiped: true,
        };
    case Actions.SET_SWIPE_STATE:
        return {
            ...state,
            isSwiped: action.isSwiped,
        };
    case Actions.SET_PAN_STATE:
        return {
            ...state,
            isPanLeft: action.isPanLeft,
            isPanRight: action.isPanRight,
        };
    case Actions.GET_NEW_CARD: {
        const lastCards = state.lastCards;
        let newCard = sample(cards);

        if (lastCards.length >= MAX_OLD_CARDS) {
            lastCards.shift();
        }

        lastCards.push(state.currentCard.id);

        while (state.currentCard.name === newCard.name || lastCards.indexOf(newCard.id) !== -1) {
            newCard = sample(cards);
        }

        if (state.isGameOver) {
            const stats = state.stats;
            const gameover = stats.filter(val => val <= 0 || val >= 1);
            const val = gameover[0];
            const index = stats.indexOf(val);

            newCard = val <= 0 ? gameOverCardsMin[index] : gameOverCardsMax[index];
        }

        return {
            ...state,
            currentCard: newCard,
            lastCards,
        };
    }
    case Actions.CHECK_GAME_OVER: {
        const stats = state.stats;
        const gameover = stats.filter(val => val <= 0 || val >= 1);

        return {
            ...state,
            isGameOver: gameover.length > 0,
        };
    }
    case Actions.RESTART_GAME:
        return {
            ...initialState,
            currentCard: state.currentCard,
        };
    default:
        return state;
    }
}

export default fmApp;
