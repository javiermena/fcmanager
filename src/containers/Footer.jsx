import { connect } from 'react-redux';
import Info from '../components/Info';

const mapStateToProps = state => ({
    teamName: state.teamName,
    daysInCharge: state.daysInCharge,
});

const Footer = connect(
    mapStateToProps,
)(Info);

export default Footer;
