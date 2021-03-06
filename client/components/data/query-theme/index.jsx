/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { requestTheme } from 'state/themes/actions';
import { isRequestingTheme } from 'state/themes/selectors';

class QueryTheme extends Component {
	static propTypes = {
		siteId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.oneOf( [ 'wpcom' ] )
		] ).isRequired,
		themeId: PropTypes.string.isRequired,
		// Connected props
		isRequesting: PropTypes.bool.isRequired,
		requestTheme: PropTypes.func.isRequired,
	}

	componentDidMount() {
		this.request( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.siteId === nextProps.siteId &&
			this.props.themeId === nextProps.themeId ) {
			return;
		}
		this.request( nextProps );
	}

	request( props ) {
		if ( ! props.isRequesting ) {
			props.requestTheme( props.themeId, props.siteId );
		}
	}

	render() {
		return null;
	}
}

export default connect(
	( state, { siteId, themeId } ) => ( {
		isRequesting: isRequestingTheme( state, siteId, themeId ),
	} ),
	{ requestTheme }
)( QueryTheme );
