# NIKKE Manager -- Browser Extension

Fetches equipment substat data for all your NIKKE characters directly from Chrome.
No Node.js or command-line tools required.

## Installation

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked** and select this `extension` folder
4. The NIKKE Manager icon will appear in your toolbar

> Chrome may show a warning about developer mode extensions on startup -- this is normal
> for extensions loaded this way. Click "Cancel" to dismiss it.

## Requirements

- A [blablalink.com](https://www.blablalink.com) account linked to your NIKKE game
- Must be logged in to blablalink.com in Chrome

## Usage

1. Log in to [blablalink.com](https://www.blablalink.com) in Chrome if you have not already
2. Click the NIKKE Manager icon in your toolbar
3. Click **Fetch Data** and wait around 10 seconds
4. Click **Download JSON** to save `nikke-equips.json`

If you are not logged in, a login button will appear -- click it to open the login page,
log in, then click Fetch Data again.

Your data is cached in the extension after each fetch, so Download JSON works any time
without re-fetching.

## Output Format

`nikke-equips.json` is structured as:

```json
{
  "16": {
    "name": "Rapi: Red Hood",
    "Helmet": [
      { "stat": "ATK", "value": 1.96, "display": "1.96%" },
      null,
      { "stat": "Critical Rate", "value": 1.36, "display": "1.36%" }
    ],
    "Chest": [ ... ],
    "Gloves": [ ... ],
    "Combat Boots": [ ... ]
  },
  ...
}
```

- Each character is keyed by their unique ID, with `name` as a field inside
- Equipment slots are `Helmet`, `Chest`, `Gloves`, and `Combat Boots`
- Each slot has 3 lines -- unoccupied lines are `null`
- Characters with no equipment equipped are included with no slot entries

## Sharing with Others

To share without requiring Load Unpacked:

1. Create a developer account at the [Chrome Web Store](https://chrome.google.com/webstore/devconsole) (~$5 one-time fee)
2. Zip the contents of this `extension` folder
3. Upload and publish -- users can then install with one click