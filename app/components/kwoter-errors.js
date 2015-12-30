import Ember from 'ember';

export default Ember.Component.extend({
  errors: null,
  classNames: ['kwoter-errors'],
  hasErrors: Ember.computed.notEmpty('errors')

});
