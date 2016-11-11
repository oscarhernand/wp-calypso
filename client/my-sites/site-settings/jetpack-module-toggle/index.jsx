/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import CompactFormToggle from 'components/forms/form-toggle/compact';
import FormSettingExplanation from 'components/forms/form-setting-explanation';

import {
	activateModule,
	deactivateModule
} from 'state/jetpack-settings/modules/actions';
import {
	isModuleActive,
	isActivatingModule,
	isDeactivatingModule
} from 'state/jetpack-settings/modules/selectors';
import { isJetpackSite } from 'state/sites/selectors';

class JetpackModuleToggle extends Component {
	static defaultProps = {
		disabled: false,
		checked: false,
		isJetpackSite: false
	};

	static propTypes = {
		siteId: PropTypes.number.isRequired,
		moduleSlug: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		checked: PropTypes.bool,
		disabled: PropTypes.bool,
		isJetpackSite: PropTypes.bool,
		activateModule: PropTypes.func,
		deactivateModule: PropTypes.func
	};

	handleChange = () => {
		if ( ! this.props.checked ) {
			this.props.activateModule( this.props.siteId, this.props.moduleSlug );
		} else {
			this.props.deactivateModule( this.props.siteId, this.props.moduleSlug );
		}
	}

	render() {
		if ( ! this.props.isJetpackSite ) {
			return null;
		}
		return (
			<span className="jetpack-module-toggle">
				<CompactFormToggle
					id={ `${ this.props.siteId }-${ this.props.moduleSlug }-toggle` }
					checked={ this.props.checked }
					onChange={ this.handleChange }
					disabled={ this.props.disabled } >
					<span>{ this.props.label }</span>
					{
						this.props.description && (
							<FormSettingExplanation isIndented>
								{ this.props.description }
							</FormSettingExplanation>
						)
					}
				</CompactFormToggle>
			</span>
		);
	}
}

export default connect( ( state, ownProps ) => {
	const isActive = isModuleActive( state, ownProps.siteId, ownProps.moduleSlug );
	const isActivating = isActivatingModule( state, ownProps.siteId, ownProps.moduleSlug );
	const isDeactivating = isDeactivatingModule( state, ownProps.siteId, ownProps.moduleSlug );
	const moduleDetailsNotLoaded = isModuleActive( state, ownProps.siteId, ownProps.moduleSlug ) === null;
	const isToggling = isActivating || isDeactivating;
	return {
		checked: ( isActive && ! isDeactivating ) || ( ! isActive && isActivating ),
		disabled: moduleDetailsNotLoaded || isToggling,
		isJetpackSite: isJetpackSite( state, ownProps.siteId )
	};
}, {
	activateModule,
	deactivateModule
} )( JetpackModuleToggle );
