/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import save from './save';
import { example } from './example';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

/**
 * @type {{edit: *, icon: (function(): *), description: string, title: string, category: string}}
 */
export const settings = {
	title: __( 'Cards Collection (Material)', 'material-design' ),
	description: __(
		'Add a group of cards to display content and actions on multiple topics.',
		'material-design'
	),
	keywords: [ __( 'Material Cards Collection', 'material-design' ) ],
	icon: <i className="material-icons-outlined">dashboard</i>,
	edit,
	save,
	example,
	deprecated,
};
