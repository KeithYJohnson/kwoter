import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'div',
	classNames: ['quote'],
	quotee: null,
	text: null,
  placeRandomly: false,
  quoteBubblesPositionsService: Ember.inject.service(),

	didRender(){
		let quoteBubblesPositionsService = this.get('quoteBubblesPositionsService');
		if ( quoteBubblesPositionsService.isDocumentFull() ){
			console.log("ITS FULL");

			// TODO App should only fetch as many quotes as necessary
			// to fill the viewport on entering into the route.
			// Will refactor this out later.
			this.$().remove();
		} else {
			let position = quoteBubblesPositionsService.generateNotOverlappingPosition();
			console.log('random position: ' + JSON.stringify(position));
			this.$().css({ left: `${position.left}px`,
										 top:  `${position.top}px`,
										 position: 'absolute' });
		}
	}
});
