import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['add-quote-icon'],
	isShowingModal: false,
  quotee: null,
  text: null,

	actions: {
		toggleModal() {
		  this.toggleProperty('isShowingModal');
		}
	}
});
