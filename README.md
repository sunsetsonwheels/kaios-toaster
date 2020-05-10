# kaios-toaster
Nice native-like toast messages for KaiOS

## Why? What for?!

*Ever wanted to have nice looking toast messages for KaiOS, but too lazy to write your own code?*

Well here you go. I took [egoist's native-toast](https://github.com/egoist/native-toast) project and made it look good on KaiOS.

## Features
- Make nice looking toast messages that look like they are from the system.
- Easy to use API.
- Lightweight, no external dependencies.

## Usage

Get a copy from the `/kaios-toaster` folder and include it locally in your packaged app, or get one served directly from GitHub Pages:

```html
...

<link rel="stylesheet" href="https://jkelol111.github.io/kaios-toaster/kaios-toaster/kaios-toaster.css">

...

<script src="https://jkelol111.github.io/kaios-toaster/kaios-toaster/kaios-toaster.js"></script>

...
```

Then, whenever you want to create a toast message, use the following syntax:

```js
kaiosToaster({
  message: 'some messsage in string',
  position: 'north/south',
  type: 'success/warning/error',
  timeout: 3000
})
```

For an example, load up the demo app (in the root of this repository)

## License
Licensed under the MIT License. A copy is available as `LICENSE.txt` in the root of this repository.

(C) Nam Thanh Nguyen (jkelol111) 2020-present.
