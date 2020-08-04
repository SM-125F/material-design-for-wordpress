/* global mtb */

import { __ } from '@wordpress/i18n';

const ImageLists = ( { radius } ) => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Image List', 'material-theme-builder' ) }
		</h4>
		<form target="_blank">
			<button 
				className="mdc-icon-button material-icons" 
				formaction="https://material.io/components/image-lists">
				open_in_new
			</button>
		</form>
		<p>
			{ __(
				'Image lists display a collection of images in an organized grid.',
				'material-theme-builder'
			) }
		</p>
		<div>
			<ul className="mdc-image-list mdc-image-list--masonry mdc-image-list--with-text-protection">
				{ mtb.images.map( ( url, i ) => (
					<li
						key={ i }
						className="mdc-image-list__item image-list-item"
						style={ { borderRadius: `${ radius }px` } }
					>
						<img
							style={ { borderRadius: `${ radius }px` } }
							className="mdc-image-list__image"
							src={ url }
							alt={ __( 'Text label', 'material-theme-builder' ) }
						/>
						<div
							className="mdc-image-list__supporting"
							style={ {
								borderBottomLeftRadius: `${ radius }px`,
								borderBottomRightRadius: `${ radius }px`,
							} }
						>
							<span className="mdc-image-list__label">
								{ __( 'Text label', 'material-theme-builder' ) }
							</span>
						</div>
					</li>
				) ) }
			</ul>
		</div>
	</div>
);

export default ImageLists;
