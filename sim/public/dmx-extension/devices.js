var fixtureOptions = ['RGB Light'];

var rgbFixtureDeviceTypes = [
  {
    name: 'baisun-led-8-ch', 
    channels: 8, 
    brightnessChannel: 1, 
    redChannel: 2, 
    greenChannel: 3, 
    blueChannel: 4, 
    whiteChannel: 5 
  },
  {
    name: 'coidak-led-8-ch', 
    channels: 8, 
    brightnessChannel: 4, 
    redChannel: 5, 
    greenChannel: 6, 
    blueChannel: 7, 
    whiteChannel: 8 
  },
  {
    name: 'custom'
  }
];

var DMXControllerOptions = ['dmxking-ultra-dmx-pro', 'enttec-usb-dmx-pro', 
                            'enttec-open-usb-dmx', 'artnet', 'bbdmx', 'dmx4all'];