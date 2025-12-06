/**
 * Parent block for flip-card-reveal block
 */

import './editor.scss';

// Components
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	LinkControl,
} from '@wordpress/block-editor';
import { useState, useId, useRef } from '@wordpress/element';
import {
	ToolbarGroup,
	ToolbarButton,
	Popover,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import { link as linkIcon, customLink, flipHorizontal } from '@wordpress/icons';
import clsx from 'clsx';
import { flipClasses } from './helpers';
import FlipCardConfirmDialog from './components/confirm-dialog';
import { clickIcon, dropDownIcon } from './components/icons';

// import { __ } from "@wordpress/i18n";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {Object} Element to render.
 */

const Edit = ( {
	attributes: { flipTrigger, outerLink, opensInNewTab },
	setAttributes,
} ) => {
	// outerLink because once inner flipped element could also have a link attribute
	const [ showOverlay, setShowOverlay ] = useState( false );
	const [ showLinkpopup, setShowLinkPopup ] = useState( false );
	const [ confirmDialogAction, setConfirmDialogAction ] = useState( null );
	const callbackDialogAction = useRef( null );

	const handleDialogConfirmEvent = () => {
		setConfirmDialogAction( null );
		if ( callbackDialogAction.current ) {
			callbackDialogAction.current();
		}
	};

	const doActionWithPossibleConfirmation = (
		action,
		callback,
		confirmationNeeded
	) => {
		if ( confirmationNeeded ) {
			callbackDialogAction.current = callback;
			setConfirmDialogAction( action );
		} else {
			callback();
		}
	};

	const linkControlId = useId();

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="image-flip-horizontal"
						onClick={ () => {
							setShowOverlay( ! showOverlay );
						} }
						isPressed={ showOverlay }
						label="Switch sides"
					/>
					<ToolbarDropdownMenu
						controls={ [
							{
								title: 'Hover',
								onClick: () =>
									setAttributes( { flipTrigger: 'hover' } ),
								isActive: flipTrigger === 'hover',
								icon: flipHorizontal,
							},
							{
								title: 'Click',
								onClick: () => {
									doActionWithPossibleConfirmation(
										'setFlipModeClick',
										() => {
											setAttributes( {
												flipTrigger: 'click',
												outerLink: null,
											} );
										},
										Boolean( outerLink )
									);
								},
								isActive: flipTrigger === 'click',
								icon: clickIcon,
							},
						] }
						icon={ dropDownIcon }
						label="Flip Trigger"
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon={ Boolean( outerLink ) ? customLink : linkIcon }
						onClick={ () => {
							setShowLinkPopup( ! showLinkpopup );
						} }
						isActive={ showLinkpopup }
						label="Add link"
					/>
					{ showLinkpopup && (
						<Popover placement="bottom-start" variant="toolbar">
							<LinkControl
								key={ linkControlId }
								value={ { url: outerLink, opensInNewTab } }
								onChange={ ( link ) => {
									const newFlipTrigger = link.url
										? 'hover'
										: flipTrigger;
									doActionWithPossibleConfirmation(
										'setURL',
										() => {
											setAttributes( {
												outerLink: link.url,
												opensInNewTab:
													link.opensInNewTab,
												flipTrigger: newFlipTrigger,
											} );
										},
										flipTrigger === 'click'
									);
								} }
								onRemove={ () => {
									setAttributes( { outerLink: undefined } );
									setShowLinkPopup( false );
								} }
								onCancel={ () => {
									setShowLinkPopup( false );
								} }
								resize={ false }
								shift={ true }
							/>
						</Popover>
					) }
				</ToolbarGroup>
			</BlockControls>

			<div
				{ ...useInnerBlocksProps(
					useBlockProps( {
						className: clsx(
							flipClasses( flipTrigger ),
							showOverlay && 'show-overlay'
						),
					} ),
					{
						orientation: 'horizontal',
						template: [
							[ 'makeiteasy/flip-card-front' ],
							[ 'makeiteasy/flip-card-reveal' ],
						],
					}
				) }
			/>
			<FlipCardConfirmDialog
				onConfirm={ handleDialogConfirmEvent }
				action={ confirmDialogAction }
				onCancel={ () => {
					setConfirmDialogAction( null );
				} }
			/>
		</>
	);
};

export default Edit;
