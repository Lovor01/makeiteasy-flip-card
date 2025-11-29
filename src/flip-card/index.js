/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit.jsx';
import save from './save.jsx';
import { ReactComponent as BlockIcon } from './block_icon.svg';

import metadata from './block.json';
import exampleImage from './assets/block-example.jpg';

metadata.example.innerBlocks[ 0 ].attributes.url = exampleImage;
metadata.example.innerBlocks[ 1 ].innerBlocks[ 0 ].attributes.url =
	exampleImage;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( metadata.name, {
	icon: BlockIcon,
	example: metadata.example,

	/**
	 * @see ./edit_save.jsx
	 */
	edit: Edit,
	save,
} );
