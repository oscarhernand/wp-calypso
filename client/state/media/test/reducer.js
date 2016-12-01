/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { MEDIA_ITEMS_RECEIVE } from 'state/action-types';
import reducer, { items } from '../reducer';

describe( 'reducer', () => {
	it( 'should include expected keys in return value', () => {
		expect( reducer( undefined, {} ) ).to.have.keys( [
			'items'
		] );
	} );

	describe( 'items()', () => {
		it( 'should default to an empty object', () => {
			const state = items( undefined, {} );

			expect( state ).to.eql( {} );
		} );

		it( 'should track items received keyed by site ID, item ID', () => {
			const originalState = deepFreeze( {} );
			const state = items( originalState, {
				type: MEDIA_ITEMS_RECEIVE,
				siteId: 2916284,
				items: [ { ID: 42, title: 'flower' } ]
			} );

			expect( state ).to.eql( {
				2916284: {
					42: { ID: 42, title: 'flower' }
				}
			} );
		} );
	} );
} );
