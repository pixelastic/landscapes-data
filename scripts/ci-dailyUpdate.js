const onCircle = require('on-circle');
const { dayjs, _ } = require('golgoth');
const { run, consoleInfo } = require('firost');

(async () => {
  await onCircle.run(async ({ success, repo }) => {
    consoleInfo('Running incremental update');
    await run('yarn run data:incremental');

    const status = await repo.status();
    if (_.isEmpty(status)) {
      success('No files changed, we stop early');
    }

    // Commit changes
    const currentDate = dayjs.utc().format('YYYY-MM-DD');
    const commitMessage = `chore(ci): Daily update (${currentDate})`;
    consoleInfo(`${status.length} files changed, commiting`);
    await repo.commitAll(commitMessage, { skipHooks: true, skipCi: true });

    // And push
    consoleInfo('Pushing changes to the repo');
    await repo.push();

    // Re-index into Algolia
    consoleInfo('Updating Algolia index');
    await run('yarn run data:indexing');

    success('Daily data updated');
  });
})();
