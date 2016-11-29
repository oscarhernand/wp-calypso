/**
 * Internal dependencies
 */
import { combineTours } from 'layout/guided-tours/config-elements';
import { MainTour } from 'layout/guided-tours/main-tour';
import { EditorInsertMenuTour } from 'layout/guided-tours/editor-insert-menu-tour';

export default combineTours( {
	main: MainTour,
	'editor-insert-menu': EditorInsertMenuTour,
} );
