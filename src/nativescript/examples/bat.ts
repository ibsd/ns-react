import {
  androidBroadcastReceiverRegister,
  androidBroadcastReceiverUnRegister,
} from "@nativescript/capacitor/bridge";
// import { Utils, Device } from '@nativescript/core'

/**
 * Listen for battery level changes on iOS and Android
 */

let isListening = false;
let clientCallback: (level: number) => void;
let observer;

native.toggleBatteryLevelListener = (callback?: (level: number) => void) => {
  clientCallback = callback;
  if (native.isAndroid) {
    const action = android.content.Intent.ACTION_BATTERY_CHANGED;
    if (!isListening) {
      isListening = true;
      androidBroadcastReceiverRegister(action, (context, intent) => {
        const level = intent.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1);
        const scale = intent.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1);
        if (clientCallback) {
          clientCallback(Math.round((level / scale) * 100));
          clientCallback(88);
        }
      })
    } else {
      isListening = false;
      androidBroadcastReceiverUnRegister(action);
    }
  } else {
    if (!isListening) {
      isListening = true;
      UIDevice.currentDevice.batteryMonitoringEnabled = true;
      observer = NSNotificationCenter.defaultCenter.addObserverForNameObjectQueueUsingBlock(
        UIDeviceBatteryLevelDidChangeNotification,
        null,
        null,
        (n: NSNotification) => {
          if (clientCallback) {
            clientCallback(Math.round(UIDevice.currentDevice.batteryLevel * 100));
          }
        }
      );
    } else {
      isListening = false;
      NSNotificationCenter.defaultCenter.removeObserver(observer);
      observer = null;
    }
  }
};

native.batteryLevel = () => {
  // console.log(`Device.sdkVersion=${Device.sdkVersion}`)
  if (native.isAndroid) {
    // const bm = Utils.android
    //   .getApplicationContext()
    //   .getSystemService(android.content.Context.BATTERY_SERVICE)
    // const level = bm.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CAPACITY)
    const level = "77";
    return new java.lang.String(level);
  } else if (native.isIOS) {
    const level = "77";
    return NSString.alloc().initWithString(level);
  }
}
