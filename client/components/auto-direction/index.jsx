/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */
import userModule from 'lib/user';

const user = userModule();

const getContent = ( { props: reactComponentProps } ) => {
	// The child is a text node
	if ( typeof reactComponentProps.children === 'string' ) {
		return reactComponentProps.children;
	}

	// This child has it's content set to external HTML
	if ( typeof reactComponentProps.dangerouslySetInnerHTML === 'object' ) {
		// Strip tags because we're only interested in the text, not markup
		// copied from: http://stackoverflow.com/questions/5002111/javascript-how-to-strip-html-tags-from-string#answer-5002161
		return reactComponentProps.dangerouslySetInnerHTML.__html
			? reactComponentProps.dangerouslySetInnerHTML.__html.replace( /<\/?[^>]+(>|$)/g, '' )
			: '';
	}

	// This child is some kind of input
	if ( typeof reactComponentProps.value === 'string' ) {
		return reactComponentProps.value;
	}

	// We have no idea how to get this element's content or it's not a leaf component
	return null;
};

// Copied from: https://github.com/twitter/RTLtextarea/blob/master/src/RTLText.module.js#L46
const rtlChar = /[\u0590-\u083F]|[\u08A0-\u08FF]|[\uFB1D-\uFDFF]|[\uFE70-\uFEFF]/mg;
const rtlThreshold = 0.3;
const getTextMainDirection = ( text ) => {
	let rtlCount = 0;
	for ( let i = 0; i < text.length; i++ ) {
		rtlCount += text[ i ].match( rtlChar ) ? 1 : 0;
	}

	return ( rtlCount / text.length > rtlThreshold ) ? 'rtl' : 'ltr';
};

const setChildDirection = ( child ) => {
	const childContent = getContent( child );

	if ( childContent ) {
		const textMainDirection = getTextMainDirection( childContent );
		const userDirection = user.isRTL() ? 'rtl' : 'ltr';

		if ( textMainDirection !== userDirection ) {
			return React.cloneElement( child, {
				direction: textMainDirection,
				style: Object.assign( {}, child.props.style, {
					direction: textMainDirection,
					textAlign: textMainDirection === 'rtl' ? 'right' : 'left'
				} )
			} );
		}

		return child;
	}

	return React.cloneElement( child, {
		children: React.Children.map( child.props.children, setChildDirection )
	} );
};

const AutoDirection = ( props ) => {
	const directionedChildren = React.Children.map( props.children, setChildDirection );

	return <div>{ directionedChildren }</div>;
};

AutoDirection.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.node ),
		PropTypes.node
	] )
};

export default AutoDirection;
