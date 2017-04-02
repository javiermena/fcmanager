import React, { Component } from 'react';
import Hammer from 'react-hammerjs';
import classNames from 'classnames';
import { sample } from 'lodash';

import cards from '../data/cards';
import gameoverTexts from '../data/gameoverTexts';

import Footer from '../containers/Footer';

const DIRECTION_LEFT = 2;
const DIRECTION_RIGHT = 4;
const ICON_SIZE = document.documentElement.clientWidth >= 500 ? 60 : 40;
const MIN_MAX_ICON_VALUE = 0.1;
const MAX_OLD_CARDS = 15;
const MONEY = 0;
const PLAYERS = 1;
const RESULTS = 2;
const PRESS = 3;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPanLeft: false,
            isPanRight: false,
            isSwiped: false,
            isTutorialShown: false,
            isGameOver: false,
            stats: [0.5, 0.5, 0.5, 0.5],
            daysInCharge: 0,
            currentCard: sample(cards),
            lastCards: [],
            gameoverText: '',
        };

        this.handlePan = this.handlePan.bind(this);
        this.handlePanEnd = this.handlePanEnd.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
        this.isStatChange = this.isStatChange.bind(this);
        this.checkGameOver = this.checkGameOver.bind(this);
        this.dismissTutorial = this.dismissTutorial.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.getNewCard = this.getNewCard.bind(this);
        this.getIconSize = this.getIconSize.bind(this);
    }

    getIconSize(icon) {
        return this.state.stats[icon] * ICON_SIZE;
    }

    getNewCard() {
        const lastCards = this.state.lastCards;
        const currentCard = this.state.currentCard;
        let newCard = sample(cards);

        if (lastCards.length >= MAX_OLD_CARDS) {
            lastCards.shift();
        }

        lastCards.push(currentCard.id);

        while (currentCard.name === newCard.name || lastCards.indexOf(newCard.id) !== -1) {
            newCard = sample(cards);
        }

        this.setState({
            currentCard: newCard,
            lastCards,
        });
    }

    isStatChange(size, stat) {
        const yesStat = this.state.currentCard.yesStats[stat];
        const noStat = this.state.currentCard.noStats[stat];

        if (this.state.isPanLeft && yesStat) {
            return (
                Math.abs(yesStat) <= MIN_MAX_ICON_VALUE && size === 'small') || (Math.abs(yesStat) > MIN_MAX_ICON_VALUE && size === 'big'
            );
        } else if (this.state.isPanRight && noStat) {
            return (
                Math.abs(noStat) <= MIN_MAX_ICON_VALUE && size === 'small') || (Math.abs(noStat) > MIN_MAX_ICON_VALUE && size === 'big'
            );
        }

        return false;
    }

    handlePan(ev) {
        this.setState({
            isPanLeft: ev.direction === DIRECTION_LEFT,
            isPanRight: ev.direction === DIRECTION_RIGHT,
        });
    }

    handlePanEnd() {
        this.setState({
            isPanLeft: false,
            isPanRight: false,
        });
    }

    handleSwipe(ev) {
        let days = this.state.daysInCharge;
        const stats = this.state.stats;
        const currentCard = this.state.currentCard;
        let newStats = stats;

        if (ev.direction === DIRECTION_LEFT) {
            newStats = stats.map((num, i) => num - currentCard.yesStats[i]);
        } else if (ev.direction === DIRECTION_RIGHT) {
            newStats = stats.map((num, i) => num - currentCard.noStats[i]);
        }

        this.checkGameOver();

        this.setState({
            daysInCharge: days += 1,
            stats: newStats,
            isSwiped: true,
        });

        setTimeout(() => {
            this.getNewCard();
        }, 1000);

        setTimeout(() => {
            this.setState({ isSwiped: false });
        }, 1500);
    }

    checkGameOver() {
        const stats = this.state.stats;
        const gameover = stats.filter(val => val <= 0 || val >= 1);
        let gameoverText = '';

        if (gameover.length) {
            const val = gameover[0];
            const index = stats.indexOf(val);
            gameoverText = gameoverTexts[Math.floor(val)][index];
        }

        this.setState({
            isGameOver: gameover.length,
            gameoverText,
        });
    }

    dismissTutorial() {
        this.setState({
            isTutorialShown: false,
        });
    }

    resetGame() {
        this.setState({
            isGameOver: false,
            isSwiped: false,
            stats: [0.5, 0.5, 0.5, 0.5],
            daysInCharge: 0,
        });
    }

    render() {
        const {
            isPanLeft,
            isPanRight,
            isSwiped,
            isGameOver,
            isTutorialShown,
            daysInCharge,
            currentCard,
            gameoverText,
        } = this.state;

        const imgClass = classNames(
            'card__imageContainer',
            { 'card__imageContainer--panLeft': isPanLeft },
            { 'card__imageContainer--panRight': isPanRight },
            { 'card__imageContainer--isSwiped': isSwiped },
        );

        const moneyClass = classNames(
            'stats__change fa fa-circle',
            { 'stats__change--small': this.isStatChange('small', [MONEY]) },
            { 'stats__change--big': this.isStatChange('big', [MONEY]) },
        );

        const playersClass = classNames(
            'stats__change fa fa-circle',
            { 'stats__change--small': this.isStatChange('small', [PLAYERS]) },
            { 'stats__change--big': this.isStatChange('big', [PLAYERS]) },
        );

        const pressClass = classNames(
            'stats__change fa fa-circle',
            { 'stats__change--small': this.isStatChange('small', [PRESS]) },
            { 'stats__change--big': this.isStatChange('big', [PRESS]) },
        );

        const resultsClass = classNames(
            'stats__change fa fa-circle',
            { 'stats__change--small': this.isStatChange('small', [RESULTS]) },
            { 'stats__change--big': this.isStatChange('big', [RESULTS]) },
        );

        const tutorialClass = classNames(
            'tutorial',
            { 'tutorial--isShown': isTutorialShown },
        );

        const gameoverClass = classNames(
            'gameover',
            { 'gameover--isShown': isGameOver },
        );

        const cardDescriptionClass = classNames(
            'card__description',
            { 'card__description--isSwiped': isSwiped },
        );

        const cardNameClass = classNames(
            'card__name',
            { 'card__name--isSwiped': isSwiped },
        );
        const imagePath = `src/images/${currentCard.image}`;

        return (
            <div className="container">
                <div className="stats">
                    <div className="stats__item">
                        <i className={moneyClass} aria-hidden="true" />
                        <i className="stats__icon fa fa-eur" aria-hidden="true" />
                        <i className="stats__level fa fa-eur" style={{ maxHeight: this.getIconSize(MONEY) }} aria-hidden="true" />
                    </div>
                    <div className="stats__item">
                        <i className={playersClass} aria-hidden="true" />
                        <i className="stats__icon fa fa-futbol-o" aria-hidden="true" />
                        <i className="stats__level fa fa-futbol-o" style={{ maxHeight: this.getIconSize(PLAYERS) }} aria-hidden="true" />
                    </div>
                    <div className="stats__item">
                        <i className={pressClass} aria-hidden="true" />
                        <i className="stats__icon fa fa-newspaper-o" aria-hidden="true" />
                        <i className="stats__level fa fa-newspaper-o" style={{ maxHeight: this.getIconSize(PRESS) }} aria-hidden="true" />
                    </div>
                    <div className="stats__item">
                        <i className={resultsClass} aria-hidden="true" />
                        <i className="stats__icon fa fa-line-chart" aria-hidden="true" />
                        <i className="stats__level fa fa-line-chart" style={{ maxHeight: this.getIconSize(RESULTS) }} aria-hidden="true" />
                    </div>
                </div>
                <div className="card">
                    <p className={cardDescriptionClass}>
                        <span className="card__descriptionText">{currentCard.description}</span>
                    </p>
                    <div className="card__background">
                        <Hammer
                          onPan={(event) => { if (!isSwiped) this.handlePan(event); }}
                          onPanEnd={this.handlePanEnd}
                          onSwipe={(event) => { if (!isSwiped) this.handleSwipe(event); }}
                        >
                            <div className={imgClass}>
                                <img src={imagePath} alt="Card" className="card__image" draggable="false" />
                                <span className="card__yesText">{currentCard.yesText}</span>
                                <span className="card__noText">{currentCard.noText}</span>
                            </div>
                        </Hammer>
                    </div>
                    <p className={cardNameClass}>{currentCard.name}</p>
                </div>
                <Footer />
                <div className={tutorialClass}>
                    <h1 className="tutorial__title">Welcome!</h1>
                    <p className="tutorial__text">
                        Try lasting in your tem as long as possible!
                        Make your decissions by swipping the image left or right,
                        and remember that by moving it a bit you can get a peek on
                        what consecuences that might have. Good luck!
                    </p>
                    <button onClick={() => this.dismissTutorial()} className="tutorial__button">Got it, let´s do this!</button>
                </div>
                <div className={gameoverClass}>
                    <h1 className="gameover__title">Game over!</h1>
                    <p className="gameover__text">
                        {gameoverText}
                    </p>
                    <p className="gameover__text">
                        You lasted {daysInCharge} days managing the team!
                    </p>
                    <button onClick={() => this.resetGame()} className="gameover__button">Try again</button>
                </div>
            </div>
        );
    }
}

export default App;
