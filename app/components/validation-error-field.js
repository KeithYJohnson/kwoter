import Ember from 'ember';

export default Ember.Component.extend({
  validatee: null,
  didValidate: null,

  errorMessage: null,
  showErrorMessage: Ember.computed('validatee.isInvalid', 'didValidate', function() {
    return (this.get('didValidate')) && this.get('validatee.isInvalid');
  }),

  errorAttribute: null,
  showErrorAttribute: null,

  init: function(){
    this._super.apply(this, arguments);
  }
});
