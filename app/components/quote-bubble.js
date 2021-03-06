import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'div',
	classNames: ['quote'],
  quoteBubblesPositionsService: Ember.inject.service(),
	strategy:   Ember.inject.service('position-strategy'),
	store: Ember.inject.service(),

	didInsertElement(){
		let quoteBubblesPositionsService = this.get('quoteBubblesPositionsService');
		if ( quoteBubblesPositionsService.isDocumentFull() ){
			// TODO App should only fetch as many quotes as necessary
			// to fill the viewport on entering into the route.
			// Will refactor this out later.
			this.$().remove();
		} else {
			let dimensions = this.$()[0].getBoundingClientRect();

			// Needed because these dimensions will be createRecorded into ember data as quote-bubble
			// and they will need an id.
			dimensions.id = this.$()[0].id;
			let position = quoteBubblesPositionsService.generateNotOverlappingPosition(dimensions);
			this.$().css({
				left: `${position.left}px`,
			  top:  `${position.top}px`,
        position: 'relative'
			});
		}
	}
});
