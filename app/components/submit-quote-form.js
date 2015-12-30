import Ember from 'ember';
import { v4 } from "ember-uuid";
import {
  validator, buildValidations
}
from 'ember-cp-validations';

var Validations = buildValidations({
  quotee: validator('presence', true),
  text:   validator('presence', true),
});

export default Ember.Component.extend(Validations, {
  tagName:   'form',
  classNames: ['submit-quote-form'],
  store: Ember.inject.service('store'),
  quotee: null,
  text: null,
  didValidate: false,
  errors: [],

  actions: {
    submit() {
      let text   = this.get('text');
      let quotee = this.get('quotee');
      let store  = this.get('store');

      // validateSync for not-async validations

      let validations = this.get('validations').validateSync().validations;
      this.set('didValidate', true);
      // errorAttrs = validations.get('errors').getEach('attribute');
      if (validations.get('isValid')) {
        let quote = store.createRecord('quote', {
          text:   text,
          quotee: quotee,
          id:     v4(),
        });
        quote.save();
      } else {
        console.log("Errors!");
      }

      // this.validate().then( () =>{
      //   debugger;
      //     let quote = store.createRecord('quote', {
      //       text:   text,
      //       quotee: quotee,
      //       id:     v4(),
      //     });
      //     quote.save();
      // }).catch( (errors) =>{
      //   debugger
      // });
    }
  }
});
