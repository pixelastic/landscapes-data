const reddinx = require('reddinx');

(async () => {
  const subredditName = 'earthporn';
  await reddinx.localUpdate(subredditName);
})();
