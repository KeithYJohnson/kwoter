// http://hashrocket.com/blog/posts/test-driving-a-stubbed-api-in-ember-with-ember-cli-mirage
import mirageInitializer from '../../initializers/ember-cli-mirage';

export default function setupMirage(container) {
  mirageInitializer.initialize(container);
}
