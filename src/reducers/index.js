import { sample } from 'lodash';

import { SET_TEAM_NAME } from '../actions';
import teamNames from '../data/teamNames';

const initialState = {
    teamName: sample(teamNames),
    daysInCharge: 1,
};

function fmApp(state = initialState, action) {
    switch (action.type) {
    case SET_TEAM_NAME:
        return [
            ...state,
            {
                teamName: action.teamName,
            },
        ];
    default:
        return state;
    }
}

export default fmApp;
