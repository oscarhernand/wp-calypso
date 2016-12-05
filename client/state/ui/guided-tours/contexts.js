import config from 'config';
import { getSectionName, isPreviewShowing, getSelectedSite, getSelectedSiteId } from 'state/ui/selectors';
import { getCurrentUser, canCurrentUser } from 'state/current-user/selectors';
import { abtest } from 'lib/abtest';
import { hasDefaultSiteTitle } from 'state/sites/selectors';

export const inSection = sectionName => state =>
	getSectionName( state ) === sectionName;

export const isEnabled = feature => () =>
	config.isEnabled( feature );

export const previewIsNotShowing = state =>
	! isPreviewShowing( state );

export const previewIsShowing = state =>
	isPreviewShowing( state );

const WEEK_IN_MILLISECONDS = 7 * 1000 * 3600 * 24;
export const isNewUser = state => {
	const user = getCurrentUser( state );
	if ( ! user ) {
		return false;
	}

	const creation = Date.parse( user.date );
	return ( Date.now() - creation ) <= WEEK_IN_MILLISECONDS;
};

export const userIsOlderThan = age => state => {
	const user = getCurrentUser( state );
	if ( ! user ) {
		return false;
	}

	const creation = Date.parse( user.date );
	return ( Date.now() - creation ) >= age;
};

export const selectedSiteIsPreviewable = state =>
	getSelectedSite( state ) && getSelectedSite( state ).is_previewable;

export const selectedSiteIsCustomizable = state =>
	getSelectedSite( state ) && getSelectedSite( state ).is_customizable;

export const isAbTestInVariant = ( testName, variant ) => () =>
	abtest( testName ) === variant;

export const selectedSiteHasDefaultSiteTitle = state => {
	const siteId = getSelectedSiteId( state );
	return siteId ? hasDefaultSiteTitle( state, siteId ) : false;
};

export const userCanEditSettingsOfSelectedSite = state => {
	const siteId = getSelectedSiteId( state );
	return siteId ? canCurrentUser( state, siteId, 'manage_options' ) : false;
};
