import { connect } from 'react-redux';
import Stats from '../components/Stats';

const mapStateToProps = state => ({
    currentCard: state.currentCard,
    isPanLeft: state.isPanLeft,
    isPanRight: state.isPanRight,
    stats: state.stats,
});

const Header = connect(
    mapStateToProps,
)(Stats);

export default Header;
