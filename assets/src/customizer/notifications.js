/* global jQuery */

/**
 * Internal dependencies
 */
import getConfig from '../block-editor/utils/get-config';

const $ = jQuery;
const api = wp.customize;
let notificationCount = false;

console.log( getConfig( 'l10n' ) );

/**
 * Show or hide the material components notification.
 *
 * @param {Function} loadMaterialLibrary
 */
export const showHideNotification = ( loadMaterialLibrary = null ) => {
	const code = 'mtb_components';
	const materialLibrary = $( '#mcb-material-library-preview' );

	if (
		false !== notificationCount &&
		2 > notificationCount &&
		! materialLibrary.is( ':visible' ) &&
		api.panel( getConfig( 'slug' ) ).expanded()
	) {
		api.notifications.add(
			new api.Notification( code, {
				message: getConfig( 'l10n' ).componentsNotice,
				type: 'warning',
				dismissible: true,
				render() {
					const li = api.Notification.prototype.render.call( this ),
						link = li.find( 'a' );

					link.on( 'click', event => {
						event.preventDefault();
						if ( 'function' === typeof loadMaterialLibrary ) {
							loadMaterialLibrary.call();
						}

						api.notifications.remove( code );
					} );

					// Handle dismissal of notice.
					li.find( '.notice-dismiss' ).on( 'click', () => {
						const request = wp.ajax.post( 'mtb_notification_dismiss', {
							nonce: getConfig( 'notifyNonce' ),
						} );

						request.done( response => {
							if ( response && response.count ) {
								notificationCount = response.count;
							}
						} );
					} );

					return li;
				},
			} )
		);
	} else {
		api.notifications.remove( code );
	}
};

/**
 * Init notifications by binding to events.
 */
export const init = () => {
	// Bind for previewer events.
	api.previewer.bind( 'mtb', settings => {
		notificationCount = settings.notificationCount;
		showHideNotification();
	} );

	api.panel( getConfig( 'slug' ) ).expanded.bind( expanded => {
		if ( ! expanded ) {
			const code = 'mtb_components';
			api.notifications.remove( code );
		}
	} );
};
