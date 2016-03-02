import Ember from 'ember';

export default Ember.Route.extend({
  quotes: null,
  scrollerRegistry: Ember.inject.service(),

  model: function() {
  	/*
		Could be efficient and grab only as many quotes as the viewport needs to be full
		Or could grab some large-enough number - say 100 - that would even fill up the
		largest desktop screen, say 30''.  After all, if its only text, would there
		be significant slowdown between fetching 100 quotes vs maybe the 20 needed
		to fill up a smaller desktop screen?

		Gonna punt on this unless it hurts me.  Maybe I'll build in a param into
		the fetching from the store than takes a number of quotes to retrieve even
		though it'll be hardcoded at first.
  	*/
    return this.store.findAll('quote');
  },

  afterModel: function(){
    let scrollerRegistry = this.get('scrollerRegistry');
    scrollerRegistry.registerScrollListeners();
  },
});
