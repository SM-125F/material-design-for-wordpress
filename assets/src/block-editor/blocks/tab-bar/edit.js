/**
 * External dependencies
 */
import { sortBy, isEqual } from 'lodash';

/**
 * Internal dependencies
 */
import './style.css';
import { Tab, TabSchema } from './components/tab';
import OrderToolbar from './components/order-toolbar';
import IconPicker from '../../components/icon-picker';
import ButtonGroup from '../../components/button-group';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { dispatch, withSelect } from '@wordpress/data';
import {
	InspectorControls,
	BlockControls,
	InnerBlocks,
} from '@wordpress/block-editor';

const ICON_POSITIONS = [
	{
		label: __( 'None', 'material-theme-builder' ),
		value: 'none',
	},
	{
		label: __( 'Leading', 'material-theme-builder' ),
		value: 'leading',
	},
	{
		label: __( 'Above', 'material-theme-builder' ),
		value: 'above',
	},
];

/**
 * Material button edit component.
 */
const TabBarEdit = ( {
	attributes: { tabs, iconPosition, forceUpdate },
	setAttributes,
	clientId,
	tabContent,
} ) => {
	const [ activeTab, setActiveTab ] = useState( tabs[ 0 ] );

	useEffect( () => {
		// If there's content, put it in the editor
		if ( activeTab.content && activeTab.content.length ) {
			dispatch( 'core/block-editor' ).replaceInnerBlocks(
				clientId,
				activeTab.content,
				false
			);
		} else {
			// Otherwise empty the editor
			const clientIds = tabContent.map( block => block.clientId );
			dispatch( 'core/editor' ).removeBlocks( clientIds );
		}
	}, [ activeTab ] );

	useEffect( () => {
		if ( ! isEqual( activeTab.content, tabContent ) ) {
			activeTab.content = tabContent;
			setAttributes( { tabs } );
		}
	} );

	const createTab = () => {
		const newId = tabs.length + 1;

		tabs.push(
			new TabSchema( {
				id: newId,
				position: newId,
				label: __( 'Tab', 'material-theme-builder' ) + ` ${ newId }`,
			} )
		);

		setAttributes( { tabs } );
		changeTab( newId );
	};

	const changeTab = id => {
		tabs = tabs.map( tab => {
			tab.active = tab.id === id;
			return tab;
		} );

		setActiveTab( tabs.find( tab => tab.id === id ) );
	};

	const moveTab = direction => {
		let newPos =
			direction === 'left' ? activeTab.position - 1 : activeTab.position + 1;

		// Prevent going out of bounds
		if ( newPos < 1 ) {
			newPos = 1;
		} else if ( newPos > tabs.length ) {
			newPos = tabs.length;
		}

		const currentTab = tabs.find( t => t.position === newPos );

		// Swap the tabs positions
		currentTab.position = activeTab.position;
		activeTab.position = newPos;

		setAttributes( { tabs: sortBy( tabs, [ 'position' ] ) } );
	};

	const setTabIcon = icon => {
		activeTab.icon = icon;
		setAttributes( { tabs, forceUpdate: ! forceUpdate } );
	};

	return (
		<>
			<div className="mdc-tab-bar" role="tablist">
				<div className="mdc-tab-scroller">
					<div className="mdc-tab-scroller__scroll-area mdc-tab-scroller__scroll-area--scroll">
						<div className="mdc-tab-scroller__scroll-content">
							{ tabs.map( props => (
								<Tab
									key={ props.id }
									onChange={ changeTab }
									iconPosition={ iconPosition }
									activeTab={ activeTab.id }
									{ ...props }
								/>
							) ) }
							<button className="tab-add" onClick={ createTab }>
								<i className="material-icons tab-add__icon">add</i>
								<span>{ __( 'New Tab', 'material-theme-builder' ) }</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div>
				<InnerBlocks />
			</div>

			<BlockControls>
				<OrderToolbar onChange={ moveTab } />
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Icon', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<ButtonGroup
						buttons={ ICON_POSITIONS }
						current={ iconPosition }
						onClick={ val => setAttributes( { iconPosition: val } ) }
					/>

					{ iconPosition !== 'none' && (
						<IconPicker
							currentIcon={ activeTab.icon }
							onChange={ setTabIcon }
						/>
					) }
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default withSelect( ( select, { clientId } ) => {
	return {
		tabContent: select( 'core/editor' ).getBlocks( clientId ),
	};
} )( TabBarEdit );
