/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Card Save component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Save = ( { className } ) => {
	return (
		<div className={ className }>
			<div className="mdc-card basic-card">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
