import React from 'react';

const Info = ({ daysInCharge, currentTeamName }) =>
    <div className="info">
        <p className="info__name">{currentTeamName} Team</p>
        <p className="info__days">{daysInCharge} days in charge of the team</p>
    </div>;

Info.propTypes = {
    daysInCharge: React.PropTypes.number.isRequired,
    currentTeamName: React.PropTypes.string.isRequired,
};

export default Info;
