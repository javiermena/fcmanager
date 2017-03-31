import React from 'react';
import classNames from 'classnames';

const GameOver = ({ daysInCharge, isGameOver, gameoverText }) => {
    const gameoverClass = classNames(
        'gameover',
        { 'gameover--isShown': isGameOver },
    );

    return (
        <div className={gameoverClass}>
            <h1 className="gameover__title">Game over!</h1>
            <p className="gameover__text">
                You lasted {daysInCharge} days managing the team!
            </p>
            <p className="gameover__text">
                {gameoverText}
            </p>
            <button onClick={() => this.resetGame()} className="gameover__button">Try again</button>
        </div>
    );
};

GameOver.propTypes = {
    daysInCharge: React.PropTypes.number.isRequired,
    isGameOver: React.PropTypes.bool.isRequired,
    gameoverText: React.PropTypes.string.isRequired,
};

export default GameOver;
