# Eclipse Official website MVP

This project keeps the supplied Eclipse base design and adds a configurable service catalogue, supporter perks, mobile navigation, ticket links, and service rules.

## Run locally

Open `index.html` in a browser. In VS Code, opening the folder with a static-server extension (such as Live Server) is optional.

## Edit content safely

- `services.js` is the central place to change the Discord ticket URL, vouch link, service categories, prices, and supporter perks.
- `index.html` contains the layout, service rules, and supporter-perk presentation.
- Review service prices and supporter perks in `services.js` before launch when Eclipse updates its Discord posts.

## Test

Open `index.html`, then check the mobile menu, each service tab, ticket links, supporter-perk layout, and keyboard focus.

## Deploy with GitHub Pages

Create a GitHub repository, upload the contents of this folder to its root, then choose **Settings → Pages → Deploy from a branch → main → /(root)**. Review the service rules and any required business, privacy, or legal information before publishing.
