// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { __experimentalConfirmDialog as ConfirmDialog } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const FlipCardConfirmDialog = ( {
	onConfirm,
	onCancel,
	action = 'setURL',
} ) => {
	const children = {
		setURL: __(
			'Setting an URL will change flip mode to "hover". Do you want to proceed?',
			'makeiteasy-flip-card'
		),
		setFlipModeClick: __(
			'Setting flip mode to "click" will remove any URL set on the card. Do you want to proceed?',
			'makeiteasy-flip-card'
		),
	};
	return (
		<ConfirmDialog
			title={ __( 'Please confirm', 'makeiteasy-flip-card' ) }
			onConfirm={ onConfirm }
			onCancel={ onCancel }
			isOpen={ Boolean( action ) }
		>
			<p>{ children[ action ] }</p>
		</ConfirmDialog>
	);
};

export default FlipCardConfirmDialog;
