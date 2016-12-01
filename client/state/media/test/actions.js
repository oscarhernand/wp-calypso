/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { MEDIA_ITEMS_RECEIVE } from 'state/action-types';
import {
	receiveMediaItem,
	receiveMediaItems
} from '../actions';

describe( 'actions', () => {
	describe( 'receiveMediaItem()', () => {
		it( 'should return an action object', () => {
			const action = receiveMediaItem( 2916284, { ID: 42, title: 'flower' } );

			expect( action ).to.eql( {
				type: MEDIA_ITEMS_RECEIVE,
				siteId: 2916284,
				items: [ { ID: 42, title: 'flower' } ]
			} );
		} );
	} );

	describe( 'receiveMediaItems()', () => {
		it( 'should return an action object', () => {
			const action = receiveMediaItems( 2916284, [ { ID: 42, title: 'flower' } ] );

			expect( action ).to.eql( {
				type: MEDIA_ITEMS_RECEIVE,
				siteId: 2916284,
				items: [ { ID: 42, title: 'flower' } ]
			} );
		} );
	} );
} );
