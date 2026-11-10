# Under Every Screen: deploying on GitHub Pages

1. Create a free account at github.com and click New repository. Name it (for example `under-every-screen`), set it to Public, and create it.
2. On the repository page choose Add file, then Upload files. Open this folder on your computer and drag in everything inside it: `index.html`, `sources.html`, `corrections.html`, `style.css`, `favicon.svg`, the five script files (`app.js`, `backpack.js`, `kolwezi.js`, `nav.js`), and the `data`, `images` and `vendor` folders. Do NOT upload a folder called `review` (it exists only in the copy made for review). Click Commit changes.
3. Go to Settings, then Pages. Under Build and deployment, set Source to Deploy from a branch, pick `main` and `/ (root)`, and Save.
4. Wait a minute or two. Your site appears at `https://YOUR-USERNAME.github.io/under-every-screen/`.
5. Add the two link-preview lines described at the bottom of this file, using your real address, and commit that change.
6. Optional: buy a domain, then add it under Settings, Pages, Custom domain, and follow GitHub's DNS instructions.

To preview on your computer first, open a terminal in this folder and run `python3 -m http.server`, then visit http://localhost:8000.

Before sharing widely: every figure should trace to a row marked verified in the source ledger. Do not publish the "Back Congolese voices" list until each group named in it has agreed in writing.


## Satellite frames (optional)

The four Landsat frames (2009, 2014, 2019, 2021) are already in the `images` folder. To replace them, save four JPG files in the `images` folder named `kolwezi-2009.jpg`, `kolwezi-2014.jpg`, `kolwezi-2019.jpg` and `kolwezi-2021.jpg` (about 1600 pixels wide and under 400 KB each). They appear automatically.

Tips:
- Use the same area and the same season in every frame. The study used dry-season images (May to July), centred on the city of Kolwezi.
- Landsat (USGS) covers all four years. Sentinel-2 only starts in 2015 and cannot show 2009. Landsat is 30 metres per pixel, so large open pits and tailings show clearly but small artisanal workings do not.
- Landsat data has no restrictions on use. The USGS asks you to credit the source: "Data available from the U.S. Geological Survey". Search and download at EarthExplorer (earthexplorer.usgs.gov).
- Sentinel data is free and open. Modified images (cropped or enhanced) must carry: "Contains modified Copernicus Sentinel data [Year]". Browse at the Copernicus Browser.
- The study's own figures are open access under CC BY 3.0 and may be reused with a citation (Brown, Boyd and Kara, Sustainability 2022).
- Edit the credit lines near the top of `kolwezi.js` so each frame's credit matches its source.

## After you know your site address

Link previews (when someone pastes the site into a message or social post) need a full web address for the preview picture, so add these two lines inside `<head>` in `index.html` once GitHub Pages gives you your address (replace the address with yours):

```html
<meta property="og:image" content="https://YOUR-NAME.github.io/YOUR-REPO/images/share.png">
<meta property="og:url" content="https://YOUR-NAME.github.io/YOUR-REPO/">
```

The picture itself is `images/share.png` (1200 by 630). `favicon.svg` is the small icon in the browser tab.
