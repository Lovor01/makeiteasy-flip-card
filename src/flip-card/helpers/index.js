import clsx from 'clsx';

const flipClasses = ( flipTrigger ) =>
	clsx(
		flipTrigger === 'hover' && 'flip-on-hover',
		flipTrigger === 'click' && 'flip-on-click'
	);

export { flipClasses };
