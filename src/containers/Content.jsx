import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Cards from '../components/Cards';

const mapStateToProps = state => ({
    isPanLeft: state.isPanLeft,
    isPanRight: state.isPanRight,
    isSwiped: state.isSwiped,
    isGameOver: state.isGameOver,
    isTutorial: state.isTutorial,
    currentCard: state.currentCard,
    stats: state.stats,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch),
});

const Content = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Cards);

export default Content;
