import { sample } from 'lodash';
import * as Actions from '../actions';
import { cards, tutorialCards, gameOverCardsMin, gameOverCardsMax } from '../data/cards';
import teamNames from '../data/teamNames';
import { MAX_OLD_CARDS } from '../constants';

const initialState = {
    teamName: sample(teamNames),
    daysInCharge: 1,
    currentCard: tutorialCards[0],
    isPanLeft: false,
    isPanRight: false,
    stats: [50, 50, 50, 50],
    isSwiped: false,
    isGameOver: false,
    isTutorial: true,
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
        const currentCard = state.currentCard;
        let isTutorial = state.isTutorial;
        let newCard = sample(cards);

        if (lastCards.length >= MAX_OLD_CARDS) {
            lastCards.shift();
        }

        lastCards.push(currentCard.id);

        while (currentCard.name === newCard.name || lastCards.indexOf(newCard.id) !== -1) {
            newCard = sample(cards);
        }

        if (state.isTutorial) {
            if (currentCard.id < tutorialCards.length) {
                newCard = tutorialCards[currentCard.id];
            } else {
                isTutorial = false;
            }
        } else if (state.isGameOver) {
            const stats = state.stats;
            const gameover = stats.filter(val => val <= 0 || val >= 100);
            const val = gameover[0];
            const index = stats.indexOf(val);

            newCard = val <= 0 ? gameOverCardsMin[index] : gameOverCardsMax[index];
        }

        return {
            ...state,
            currentCard: newCard,
            lastCards,
            isTutorial,
        };
    }
    case Actions.CHECK_GAME_OVER: {
        const stats = state.stats;
        const gameover = stats.filter(val => val <= 0 || val >= 100);

        return {
            ...state,
            isGameOver: gameover.length > 0,
        };
    }
    case Actions.DISMISS_TUTORIAL: {
        return {
            ...state,
            isTutorial: false,
        };
    }
    case Actions.RESTART_GAME:
        return {
            ...initialState,
            currentCard: state.currentCard,
            teamName: sample(teamNames),
        };
    default:
        return state;
    }
}

export default fmApp;
