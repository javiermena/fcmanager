import React from 'react';
import classNames from 'classnames';
import Hammer from 'react-hammerjs';
import { DIRECTION_LEFT, DIRECTION_RIGHT } from '../constants';

const Cards = ({
    isPanLeft,
    isPanRight,
    isSwiped,
    isGameOver,
    isTutorial,
    currentCard,
    stats,
    actions }) => {
    const cardDescriptionTextClass = classNames(
        'card__descriptionText',
        { 'card__descriptionText--isSwiped': isSwiped },
    );

    const cardNameClass = classNames(
        'card__name',
        { 'card__name--isSwiped': isSwiped },
    );

    const imgClass = classNames(
        'card__imageContainer',
        { 'card__imageContainer--panLeft': isPanLeft },
        { 'card__imageContainer--panRight': isPanRight },
        { 'card__imageContainer--isSwiped': isSwiped },
        { 'card__imageContainer--isGameOver': isGameOver },
    );

    /*eslint-disable */
    const imagePath = () => require(`../assets/images/${currentCard.image}`);
    /*eslint-enable */

    const handlePan = ev =>
        actions.setPanState(ev.direction === DIRECTION_LEFT, ev.direction === DIRECTION_RIGHT);

    const handlePanEnd = () => actions.setPanState(false, false);

    const handleSwipe = (ev) => {
        if (isTutorial) {
            actions.setSwipeState(true);
            if (ev.direction === DIRECTION_LEFT) actions.dismissTutorial();
        } else if (isGameOver) {
            actions.setSwipeState(true);
            setTimeout(() => {
                actions.restartGame();
            }, 999);
        } else {
            let newStats = stats;

            if (ev.direction === DIRECTION_LEFT) {
                newStats = stats.map((num, i) => num - currentCard.noStats[i]);
            } else if (ev.direction === DIRECTION_RIGHT) {
                newStats = stats.map((num, i) => num - currentCard.yesStats[i]);
            }

            actions.updateStats(newStats);
            actions.checkGameOver();
        }

        setTimeout(() => {
            actions.getNewCard();
        }, 1000);

        setTimeout(() => {
            actions.setSwipeState(false);
        }, 1500);
    };

    return (
        <div className="card">
            <p className="card__description">
                <span className={cardDescriptionTextClass}>{currentCard.description}</span>
            </p>
            <div className="card__background">
                <Hammer
                  onPan={(event) => { if (!isSwiped) handlePan(event); }}
                  onPanEnd={handlePanEnd}
                  onSwipe={(event) => { if (!isSwiped) handleSwipe(event); }}
                >
                    <div className={imgClass}>
                        <img src={imagePath()} alt="Card" className="card__image" draggable="false" />
                        <span className="card__noText">{currentCard.noText}</span>
                        <span className="card__yesText">{currentCard.yesText}</span>
                    </div>
                </Hammer>
            </div>
            <p className={cardNameClass}>{currentCard.name}</p>
        </div>
    );
};

Cards.propTypes = {
    isPanLeft: React.PropTypes.bool.isRequired,
    isPanRight: React.PropTypes.bool.isRequired,
    isSwiped: React.PropTypes.bool.isRequired,
    isGameOver: React.PropTypes.bool.isRequired,
    isTutorial: React.PropTypes.bool.isRequired,
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
    stats: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    actions: React.PropTypes.shape({
        checkGameOver: React.PropTypes.func,
        getNewCard: React.PropTypes.func,
        setPanState: React.PropTypes.func,
        setSwipeState: React.PropTypes.func,
        updateStats: React.PropTypes.func,
    }).isRequired,
};

export default Cards;
