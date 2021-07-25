const reddinx = require('reddinx');

(async () => {
  const subredditName = 'earthporn-debug';
  await reddinx.localUpdate(subredditName);
})();
