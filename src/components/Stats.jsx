import React from 'react';
import classNames from 'classnames';
import { MONEY, PLAYERS, RESULTS, PRESS, ICON_SIZE, MIN_MAX_ICON_VALUE } from '../constants';

const Stats = ({ currentCard, isPanLeft, isPanRight, stats }) => {
    const isStatChange = (size, stat) => {
        const yesStat = currentCard.yesStats[stat];
        const noStat = currentCard.noStats[stat];

        if (isPanRight && yesStat) {
            return (
                Math.abs(yesStat) <= MIN_MAX_ICON_VALUE && size === 'small') || (Math.abs(yesStat) > MIN_MAX_ICON_VALUE && size === 'big'
            );
        } else if (isPanLeft && noStat) {
            return (
                Math.abs(noStat) <= MIN_MAX_ICON_VALUE && size === 'small') || (Math.abs(noStat) > MIN_MAX_ICON_VALUE && size === 'big'
            );
        }

        return false;
    };

    const getIconSize = icon => ((100 - stats[icon]) / 100) * ICON_SIZE;

    const moneyClass = classNames(
        'stats__change fa fa-circle',
        { 'stats__change--small': isStatChange('small', MONEY) },
        { 'stats__change--big': isStatChange('big', MONEY) },
    );

    const playersClass = classNames(
        'stats__change fa fa-circle',
        { 'stats__change--small': isStatChange('small', PLAYERS) },
        { 'stats__change--big': isStatChange('big', PLAYERS) },
    );

    const pressClass = classNames(
        'stats__change fa fa-circle',
        { 'stats__change--small': isStatChange('small', PRESS) },
        { 'stats__change--big': isStatChange('big', PRESS) },
    );

    const resultsClass = classNames(
        'stats__change fa fa-circle',
        { 'stats__change--small': isStatChange('small', RESULTS) },
        { 'stats__change--big': isStatChange('big', RESULTS) },
    );

    return (
        <div className="stats">
            <div className="stats__item">
                <i className={moneyClass} aria-hidden="true" />
                <i className="stats__icon fa fa-eur" aria-hidden="true" />
                <i className="stats__level fa fa-eur" style={{ maxHeight: getIconSize(MONEY) }} aria-hidden="true" />
            </div>
            <div className="stats__item">
                <i className={playersClass} aria-hidden="true" />
                <i className="stats__icon fa fa-futbol-o" aria-hidden="true" />
                <i className="stats__level fa fa-futbol-o" style={{ maxHeight: getIconSize(PLAYERS) }} aria-hidden="true" />
            </div>
            <div className="stats__item">
                <i className={resultsClass} aria-hidden="true" />
                <i className="stats__icon fa fa-line-chart" aria-hidden="true" />
                <i className="stats__level fa fa-line-chart" style={{ maxHeight: getIconSize(RESULTS) }} aria-hidden="true" />
            </div>
            <div className="stats__item">
                <i className={pressClass} aria-hidden="true" />
                <i className="stats__icon fa fa-newspaper-o" aria-hidden="true" />
                <i className="stats__level fa fa-newspaper-o" style={{ maxHeight: getIconSize(PRESS) }} aria-hidden="true" />
            </div>
        </div>
    );
};

Stats.propTypes = {
    currentCard: React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        description: React.PropTypes.string,
        image: React.PropTypes.string,
        yesText: React.PropTypes.string,
        yesStats: React.PropTypes.arrayOf(React.PropTypes.number),
        noText: React.PropTypes.string,
        noStats: React.PropTypes.arrayOf(React.PropTypes.number),
    }).isRequired,
    isPanLeft: React.PropTypes.bool.isRequired,
    isPanRight: React.PropTypes.bool.isRequired,
    stats: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
};

export default Stats;
