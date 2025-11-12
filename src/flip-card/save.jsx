import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { flipClasses } from './helpers';

const save = ( { attributes: { flipTrigger, outerLink, opensInNewTab } } ) => {
	const hasLink = Boolean( outerLink );
	const blockProps = useBlockProps.save( {
		className: flipClasses( flipTrigger ),
	} );
	const innerBlocksProps = useInnerBlocksProps.save(
		hasLink ? null : blockProps
	);

	/**
	 * Wraps inner blocks in an anchor tag if an outer link is set.
	 *
	 * @return {Object} Block properties, possibly including an anchor wrapper.
	 */
	const conditionallyWrapInAnchor = () => {
		return hasLink
			? {
					...blockProps,
					children: (
						// eslint-disable-next-line jsx-a11y/anchor-has-content
						<a
							href={ outerLink }
							target={ opensInNewTab ? '_blank' : '_self' }
							rel={
								opensInNewTab
									? 'noopener noreferrer'
									: undefined
							}
							{ ...innerBlocksProps }
						/>
					),
			  }
			: innerBlocksProps;
	};

	return (
		<div
			{ ...conditionallyWrapInAnchor() }
			role={ flipTrigger === 'click' ? 'button' : null }
			tabIndex="0"
		/>
	);
};

export default save;
