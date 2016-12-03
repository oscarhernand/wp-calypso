/**
 * External dependencies
 */
import React from 'react';
import noop from 'lodash/noop';

/**
 * Internal dependencies
 */
import Site from 'blocks/site';
import FollowButton from 'reader/follow-button';

const PostHeader = ( { site, siteUrl, showFollow, onSiteSelect } ) => (
	<div className="reader__post-header">
		{ showFollow ? <FollowButton siteUrl={ siteUrl } /> : null }
		<Site site={ site }
			href={ siteUrl }
			onSelect={ onSiteSelect } />
	</div>
);

PostHeader.propTypes = {
	site: React.PropTypes.object,
	siteUrl: React.PropTypes.string,
	showFollow: React.PropTypes.bool,
	onSiteSelect: React.PropTypes.func
};

PostHeader.defaultProps = {
	showFollow: false,
	onSiteSelect: noop
};

export default PostHeader;
