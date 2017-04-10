import React from 'react';

const Info = ({ daysInCharge, teamName }) =>
    <div className="info">
        <p className="info__name">{teamName} Team</p>
        <p className="info__days">{daysInCharge} {daysInCharge > 1 ? 'days' : 'day'} in charge of the team</p>
    </div>;

Info.propTypes = {
    daysInCharge: React.PropTypes.number.isRequired,
    teamName: React.PropTypes.string.isRequired,
};

export default Info;
