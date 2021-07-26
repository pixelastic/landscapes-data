const indexing = require('algolia-indexing');
const { glob, readJson } = require('firost');
const { pMap } = require('golgoth');

(async function () {
  const credentials = {
    appId: 'O3F8QXYK6R',
    apiKey: process.env.ALGOLIA_API_KEY,
    indexName: 'landscapes',
  };
  const settings = {
    searchableAttributes: ['title', 'author.name'],
    attributesForFaceting: ['author.name', 'tags', 'misc.postHint'],
    customRanking: ['desc(date.day)', 'desc(score.value)', 'desc(score.ratio)'],
  };

  indexing.verbose();
  indexing.config({
    batchMaxSize: 100,
  });

  const files = await glob('./data/**/*.json');
  const records = await pMap(files, readJson);
  await indexing.fullAtomic(credentials, records, settings);
})();
