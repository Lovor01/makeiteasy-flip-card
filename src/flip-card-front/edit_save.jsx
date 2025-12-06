/**
 * Parent block for cover-hover blocks
 */

import './editor.scss';

// Components
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export const Edit = () => {
	const innerBlocksProps = useInnerBlocksProps( useBlockProps(), {
		orientation: 'horizontal',
		template: [ [ 'core/cover' ] ],
	} );

	return <div { ...innerBlocksProps } />;
};

export const Save = () => {
	const innerBlocksProps = useInnerBlocksProps.save( useBlockProps.save() );
	return <div { ...innerBlocksProps }></div>;
};
