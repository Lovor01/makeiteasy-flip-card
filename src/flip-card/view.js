import './view.scss';

function setEvents() {
	// Handle click to flip

	function setEventsForSelector( selector ) {
		const selectedElements = document.querySelectorAll( selector );
		if ( ! selectedElements.length ) {
			return false;
		}

		selectedElements.forEach( ( el ) => {
			el.addEventListener( 'click', () => {
				const state = el.classList.toggle( 'mie-flipped' );
				el.setAttribute( 'aria-expanded', state );
			} );
		} );
		return true;
	}

	setEventsForSelector( '.wp-block-makeiteasy-flip-card.flip-on-click' );
}

const domReady = function ( callback ) {
	if (
		document.readyState === 'interactive' ||
		document.readyState === 'complete'
	) {
		callback();
	} else {
		document.addEventListener( 'DOMContentLoaded', callback );
	}
};

// Initialize events on DOM ready
domReady( () => {
	setEvents();
} );
