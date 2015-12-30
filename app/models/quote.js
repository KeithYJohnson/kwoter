import DS from 'ember-data';
import Validator from '../mixins/model-validator';

export default DS.Model.extend(Validator, {
  quotee: DS.attr(),
  text: DS.attr(),

  validations: {
    quotee: { presence: { message: 'Who uttereth\'d dat?' } },
    text:   { presence: { message: 'What hath they uttereth\'d' } }
  },
});
