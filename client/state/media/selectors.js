/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Given a site and media ID, returns the media item, or null if the media item
 * is not known.
 *
 * @param  {Object}  state   Global state tree
 * @param  {Number}  siteId  Site ID
 * @param  {Number}  mediaId Media ID
 * @return {?Object}         Media object, if known
 */
export function getMediaItem( state, siteId, mediaId ) {
	return get( state.media.items, [ siteId, mediaId ], null );
}
