import Ember from 'ember';
import ScrollerSwitchMixin from '../../../mixins/scroller-switch';
import { module, test } from 'qunit';

module('Unit | Mixin | scroller switch');

// Replace this with your real tests.
test('it works', function(assert) {
  var ScrollerSwitchObject = Ember.Object.extend(ScrollerSwitchMixin);
  var subject = ScrollerSwitchObject.create();
  assert.ok(subject);
});
