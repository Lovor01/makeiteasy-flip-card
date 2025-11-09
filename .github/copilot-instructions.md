This repository is a small WordPress plugin that provides one or more Gutenberg blocks built with @wordpress/scripts. The guidance below gives AI coding agents the repository "big picture" plus focused, actionable rules and examples so changes are correct and consistent.

- Project layout

  - `flip-card.php` — main plugin bootstrap; registers blocks by reading `build/blocks-manifest.php` and registering block types for backwards compatibility (supports WordPress 6.7+ and optimized 6.8 API paths).
  - `build/` — generated production assets. Do NOT edit directly; instead edit `src/` and run the build scripts.
  - `src/` — block source code. Each block has its own folder (e.g. `src/flip-card/`) that contains `block.json`, `edit.js`, `save.js`, `index.js`, and styles.
  - `package.json` — uses `@wordpress/scripts`. Key scripts:
    - `npm run build` -> `wp-scripts build --blocks-manifest` (production build + generates `build/blocks-manifest.php`)
    - `npm start` -> `wp-scripts start --blocks-manifest` (dev server/watch mode)
    - `npm run plugin-zip` -> packages plugin for distribution
    - `npm run lint:js` and `npm run lint:css` -> linting

- High-level architecture and data flow

  - Blocks are defined via block.json (apiVersion 3) and JavaScript registerBlockType glue in `src/*/index.js`.
  - Build produces a PHP-friendly `build/blocks-manifest.php` used by `flip-card.php` to register assets and block metadata during `init`.
  - Editor-only assets are referenced via `editorScript` and `editorStyle`; front-end assets use `viewScript` and `style` entries in the manifest.

- Conventions agents should follow

  - Never edit files inside `build/` — they are generated. Make changes in `src/` and run `npm run build` or `npm start`.
  - Block metadata must be in `block.json` using the WP block schema (apiVersion 3). When adding a new block, follow existing pattern in `src/flip-card/block.json` and use the naming convention `makeiteasy/<block-name>`.
  - Use existing CSS/SCSS conventions: source styles live next to the block in `src/*/style.scss` or `editor.scss`; imports in `index.js` ensure bundling.
  - i18n: use `__()` from `@wordpress/i18n` in editor code and ensure `textdomain` in `block.json` is set to `flip-card`.

- Build/test/debug workflow (practical steps)

  - Dev: run `npm start` to start a watcher that regenerates `build/` and serves editor assets. Use WP admin to edit pages and see live changes.
  - Prod build: run `npm run build`. This updates `build/` and `build/blocks-manifest.php` which `flip-card.php` loads.
  - Packaging: `npm run plugin-zip` will create a distributable zip (uses `@wordpress/scripts` helper).

- Files to inspect when making changes

  - `src/*/block.json` — schema and registered asset entries
  - `src/*/index.js`, `src/*/edit.js`, `src/*/save.js` — registration and editor/front-end logic
  - `build/blocks-manifest.php` — generated manifest (useful to verify build output)
  - `flip-card.php` — plugin bootstrap and runtime registration details

- Examples and short snippets (follow these patterns)

  - Registering a block (src/flip-card/index.js):
    - import metadata from './block.json'; registerBlockType(metadata.name, { edit, save });
  - Use block props and translations in edit.js:
    - import { \_\_ } from '@wordpress/i18n'; import { useBlockProps } from '@wordpress/block-editor';
    - return <p {...useBlockProps()}>{ \_\_('Flip Card — hello from the editor!', 'flip-card') }</p>;

- Safe change rules for agents

  - Do not change `flip-card.php`’s registration logic unless fixing a bug or explicitly updating WordPress compatibility notes; modifying registration patterns can break sites.
  - Add new runtime dependencies via `package.json` only when necessary and run `npm install --save-dev` (follow project's devDependencies style — minimal and pinned to the @wordpress/scripts major).
  - When editing JavaScript or SCSS, run `npm run build` and ensure `build/blocks-manifest.php` updates. Include generated changes in PRs only if the pipeline expects built assets — otherwise prefer CI to build.

- Unknowns / prompts for the human maintainer
  - No automated tests or CI config present in the repository. Ask whether the project should keep built assets in source control or rely on CI to build during release.
  - Confirm whether `makeiteasy` is the intended namespace for block names or needs changing across files.

If anything in these instructions is unclear, tell me what you'd like me to expand or confirm (for example: add a checklist for creating a new block, or a sample `npm install` command to add a dependency). Please review and suggest edits.
