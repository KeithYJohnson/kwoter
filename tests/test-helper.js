import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

QUnit.testDone(() => {
  let body = $('body');

  let viewport = {
    width: $(window).width(),
    height: $(window).height()
  };

  body.css({height: `${viewport.height}px`, width: `${viewport.height}px`});
});