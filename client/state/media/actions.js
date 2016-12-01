/**
 * Internal dependencies
 */
import {
	MEDIA_ITEMS_RECEIVE
} from 'state/action-types';

/**
 * Returns an action object to be used in signalling that a media item has been
 * received.
 *
 * @param  {Number} siteId Site ID
 * @param  {Object} item   Media item received
 * @return {Object}        Action object
 */
export function receiveMediaItem( siteId, item ) {
	return receiveMediaItems( siteId, [ item ] );
}

/**
 * Returns an action object to be used in signalling that multiple media items
 * have been received.
 *
 * @param  {Number} siteId Site ID
 * @param  {Array}  items  Media items received
 * @return {Object}        Action object
 */
export function receiveMediaItems( siteId, items ) {
	return {
		type: MEDIA_ITEMS_RECEIVE,
		siteId,
		items
	};
}
