const { app, Menu, Tray, powerMonitor } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let enabled = true;

let tray;
const createTray = () => {
  tray = new Tray(path.join(__dirname, 'plug.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Enabled',
      type: 'checkbox',
      checked: enabled,
      click: e => enabled = e.checked,
    },
    {
      type: 'separator',
    },
    {
      label: 'Quit',
      type: 'normal',
      click: () => app.quit()
    }
  ]);
  tray.setContextMenu(contextMenu);
};

app.whenReady().then(() => {
  createTray();

  app.dock.hide();

  powerMonitor.on('on-ac', () => {
    if (enabled) {
      exec(`afplay \"${path.join(__dirname, 'thepower.mp3')}\" -v 0.5`);
    }
  });
});
