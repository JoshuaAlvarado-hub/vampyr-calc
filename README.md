# Vampyr Calc

Vampyr Calc is a goth pixel-art desktop calculator built with Electron.

## Features

- Full pixel-art UI drawn in Aseprite
- Keyboard support
- Scales to your screen size automatically

## Running from Source

You'll need [Node.js](https://nodejs.org/) installed.

```bash
git clone https://github.com/JoshuaAlvarado-hub/vampyr-calc.git
cd vampyr-calc
npm install
npm start
```

## Building

```bash
npm run build
```

Produces a `dist/` folder containing:
- **Linux:** `Vampyr Calc-1.0.0.AppImage`
- **Windows:** installer `.exe` (must be built on Windows)

## Adding to Start Menu

**Windows:** The installer handles this automatically.

**Linux:** After running the AppImage once, you can integrate it into your application menu:

```bash
cp "dist/Vampyr Calc-1.0.0.AppImage" ~/.local/bin/vampyr-calc.AppImage
chmod +x ~/.local/bin/vampyr-calc.AppImage
```

Then create `~/.local/share/applications/vampyr-calc.desktop`:

```ini
[Desktop Entry]
Name=Vampyr Calc
Exec=/home/YOUR_USERNAME/.local/bin/vampyr-calc.AppImage
Icon=/path/to/vampyr-calc/src/assets/top-decor.png
Type=Application
Categories=Utility;
```

```bash
update-desktop-database ~/.local/share/applications/
```

## Credits

Designed & developed by **Joshua Alvarado**  
Pixel art drawn in [Aseprite](https://www.aseprite.org/)  
Font: [Silkscreen](https://fonts.google.com/specimen/Silkscreen) by Jason Kottke