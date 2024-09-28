import { PuppeteerCrawler, Request } from 'crawlee';

const REPO_COUNT = 20;

const crawler = new PuppeteerCrawler({
    requestHandler: async ({ request, page, infiniteScroll }) => {
        const title = await page.title()
        console.log(title);

        if (request.label === 'repository') {
            const commitCountSelector = 'span.d-none.d-sm-inline > strong';
            await page.waitForSelector(commitCountSelector);
            const commitText = await page.$eval(commitCountSelector, (el) => el.textContent);
            const numberStrings = commitText.match(/\d+/g);
            const commitCount = Number(numberStrings.join(''));
            console.log(commitCount);
        } else {
            await infiniteScroll({
                buttonSelector: 'text=Load more',
                stopScrollCallback: async () => {
                    const repos = await page.$$('article.border');
                    return repos.length >= REPO_COUNT;
                },
            });

            const repos = await page.$$eval('article.border', (repoCards) => {
                return repoCards.map(card => {
                    const [user, repo] = card.querySelectorAll('h3 a');
                    const stars = card.querySelector('#repo-stars-counter-star')
                        .getAttribute('title');
                    const description = card.querySelector('div.px-3 > p');
                    const topics = card.querySelectorAll('a.topic-tag');

                    const toText = (element) => element && element.innerText.trim();
                    const parseNumber = (text) => Number(text.replace(/,/g, ''));

                    return {
                        user: toText(user),
                        repo: toText(repo),
                        url: repo.href,
                        stars: parseNumber(stars),
                        description: toText(description),
                        topics: Array.from(topics)
                            .map((t) => toText(t)),
                    };
                });
            });

            console.log('Repository count:', repos.length);
            const requests = repos.map(repo => new Request({
                url: repo.url,
                label: 'repository',
                userData: repo,
            }));

            await crawler.addRequests(requests);
        }
    }
})

await crawler.run(['https://github.com/topics/javascript']);
