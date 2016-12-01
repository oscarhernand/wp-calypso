/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getMediaItem } from '../selectors';

describe( 'selectors', () => {
	describe( 'getMediaItem()', () => {
		it( 'should return null if not tracking any media for site', () => {
			const mediaItem = getMediaItem( {
				media: {
					items: {}
				}
			}, 2916284, 42 );

			expect( mediaItem ).to.be.null;
		} );

		it( 'should return null if not tracking specific media for site', () => {
			const mediaItem = getMediaItem( {
				media: {
					items: {
						2916284: {
							31: { ID: 31, title: 'leftovers' }
						}
					}
				}
			}, 2916284, 42 );

			expect( mediaItem ).to.be.null;
		} );

		it( 'should return media item for site', () => {
			const mediaItem = getMediaItem( {
				media: {
					items: {
						2916284: {
							31: { ID: 31, title: 'leftovers' },
							42: { ID: 42, title: 'flower' }
						}
					}
				}
			}, 2916284, 42 );

			expect( mediaItem ).to.eql( { ID: 42, title: 'flower' } );
		} );
	} );
} );
