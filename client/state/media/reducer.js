/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import { keyBy } from 'lodash';

/**
 * Internal dependencies
 */
import { createSiteReducer } from 'state/utils';
import { MEDIA_ITEMS_RECEIVE } from 'state/action-types';

/**
 * Returns the updated upload queue state after an action has been dispatched.
 * The state a mapping of site ID to media keyed by ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export const items = createSiteReducer( {}, {
	[ MEDIA_ITEMS_RECEIVE ]: ( state, action ) => {
		return {
			...state,
			...keyBy( action.items, 'ID' )
		};
	}
} );

export default combineReducers( {
	items
} );
