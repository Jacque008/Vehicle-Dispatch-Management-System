# Tab Bar Icons

This directory should contain the tab bar icons for the WeChat Mini Program.

## Required Icons (64x64px PNG):

1. **home.png** - Home icon (inactive state)
2. **home-active.png** - Home icon (active state)
3. **assignments.png** - Assignments icon (inactive state)
4. **assignments-active.png** - Assignments icon (active state)
5. **history.png** - History icon (inactive state)
6. **history-active.png** - History icon (active state)
7. **profile.png** - Profile icon (inactive state)
8. **profile-active.png** - Profile icon (active state)

## Icon Guidelines:

- Size: 64x64 pixels (128x128 for @2x, 192x192 for @3x)
- Format: PNG with transparency
- Inactive state: Gray color (#666666)
- Active state: Blue color (#2563eb)

You can create simple icons using design tools like:
- Figma
- Sketch
- Adobe Illustrator
- Or download free icons from: https://www.iconfont.cn/ or https://www.iconfinder.com/

For development, you can use placeholder icons or temporarily disable the tab bar in `app.json` by commenting out the `tabBar` configuration.
