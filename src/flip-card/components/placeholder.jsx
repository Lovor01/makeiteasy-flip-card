import { Placeholder } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

const EmptyPlaceholder = () => (
	<Placeholder className="mie-empty-placeholder">
		{ _x(
			'Slider is empty.',
			'empty slider placeholder',
			'makeiteasy-flip-card'
		) }
		<br />
		{ _x(
			'Add slide by clicking on "plus".',
			'empty slider placeholder',
			'makeiteasy-flip-card'
		) }
		<br />
		{ _x(
			'Inside slide add Cover, Image, Media & Text or any other block.',
			'empty slider placeholder',
			'makeiteasy-flip-card'
		) }
	</Placeholder>
);

export default EmptyPlaceholder;
