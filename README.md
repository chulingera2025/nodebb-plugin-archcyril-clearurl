# nodebb-plugin-archcyril-cleanurl

Clean slugs from NodeBB topic/category URLs via client-side URL interception.

## What it does

Removes the slug portion from NodeBB URLs, keeping only the numeric ID:

| Before | After |
|--------|-------|
| `/topic/123/some-title` | `/topic/123` |
| `/category/5/some-name` | `/category/5` |
| `/topic/123/some-title/456` | `/topic/123/456` |

## How it works

- Intercepts `history.pushState` and `history.replaceState` to strip slugs before they reach the address bar
- Runs `cleanCurrentUrl` on page load and after NodeBB's `action:ajaxify.end`
- No server-side changes, no redirects, no performance penalties
- Old slug URLs continue to work normally — no 404s

## Installation

```
npm install nodebb-plugin-archcyril-cleanurl
```

Then activate the plugin in your NodeBB admin panel.

## License

MIT