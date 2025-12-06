=== MakeITeasy Flip Card ===
Contributors:      lovor
Donate link:       https://buymeacoffee.com/lovro
Tags:              block, flip card, reveal card
Tested up to:      6.9
Stable tag:        1.0.1
License:           LGPLv3
License URI:       https://www.gnu.org/licenses/lgpl-3.0.html

Flip card block - revealing "other side" on hover or click. Aligned with core blocks styles and functioning.

== Description ==

An interactive web element that reveals additional content on hover or click. The Flip Card block includes toolbar controls to choose whether the back side appears on hover or on click.
When the opening mode is set to hover, you can also assign a link to the entire card.

== Installation ==

= From block editor: =

Search for 'makeiteasy flip card' in the block editor when adding a new block via the '+' sign in the top bar.

= Standard Installation: =

1. Upload the plugin files to the `/wp-content/plugins/makeiteasy-flip-card` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress

== Changelog ==

= 1.0.1 =
Fixed issue with inner block initialization.

= 1.0.0 =
- Release

== Frequently Asked Questions ==

= How to edit other side of the card? =

Click on the block to select it, then use the block toolbar button to toggle side of the card.

== Screenshots ==

1. front-side.jpg
2. back-side.jpg
3. change-button.png

== Key Features ==

- 🥇 **Feature-Rich**.
- 🥈 **Fully Open Source**: Including the block source code. Fork and adjust as needed.
- 🥉 **Developer friendly**: Unopinionated starting CSS - styled through theme.
- ⏲️ **Future-Proof Compatibility**: Guaranteed compatibility with future WordPress versions by using recommended block coding practices.

== Developer Notes ==

There is a full source code on [github](https://github.com/Lovor01/makeiteasy-flip-card). You can investigate code, adjust it to your needs, collaborate, ...
Development:
- Run `npm install` to install dependencies.
- To develop, either:
  - remove webpack.config.json and run `npm run start` to start a development server without live reloading.
  - leave webpack.config.json and set .env file with host, cert_location and key_location variables and run `npm run start` to start a development server with live reloading.
- To build for production, run `npm run build`.
