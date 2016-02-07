import getRandomInteger, { steppedRandomInteger } from '../../../utils/random-numbers';
import { module, test } from 'qunit';

module('Unit | Utility | random numbers');

test('steppedRandomInteger', function(assert) {
  let step = 5;
  let floor = 0;
  let ceiling = 100;
  var result = steppedRandomInteger(floor, ceiling, step);
  assert.ok(floor < result < ceiling);
  assert.equal(result % step,  0);
});

test('getRandomInteger', function(assert) {
  let step = 5;
  let floor = 0;
  let ceiling = 100;
  var result = getRandomInteger(floor, ceiling, step);
  assert.ok(floor < result < ceiling);
});
