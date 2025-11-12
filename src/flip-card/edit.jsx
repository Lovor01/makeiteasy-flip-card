/**
 * Parent block for cover-hover blocks
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

	const clickIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#e3e3e3"
		>
			<path d="M468-240q-96-5-162-74t-66-166q0-100 70-170t170-70q97 0 166 66t74 162l-84-25q-13-54-56-88.5T480-640q-66 0-113 47t-47 113q0 57 34.5 100t88.5 56l25 84ZM821-60 650-231 600-80 480-480l400 120-151 50 171 171-79 79Z" />
		</svg>
	);
	const dropDownIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#e3e3e3"
		>
			<path d="M40-160v-640h400v160h-80v-80H120v480h240v-80h80v160H40Zm480 0v-160h80v80h80v80H520Zm240 0v-80h80v-80h80v160H760ZM520-640v-160h160v80h-80v80h-80Zm320 0v-80h-80v-80h160v160h-80ZM120-240v-480 480Zm560-80-56-56 63-64H240v-80h447l-63-64 56-56 160 160-160 160Z" />
		</svg>
	);
	const linkControlId = useId();
	// const memoizedValue = useMemo(
	// 	() => ( {
	// 		url: outerLink,
	// 		opensInNewTab: opensInNewTab === '_blank',
	// 	} ),
	// 	[ outerLink, opensInNewTab ]
	// );

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
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon={ Boolean( outerLink ) ? customLink : linkIcon }
						onClick={ () => {
							setShowLinkPopup( ! showLinkpopup );
						} }
						isActive={ showLinkpopup }
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
							[ 'core/cover' ],
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
