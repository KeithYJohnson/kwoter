export function initialize(/* container, application */) {
  Number.prototype.between = function(a, b) {
    var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
    return this > min && this < max;
  };
}

export default {
  name: 'number-between',
  initialize: initialize
};
