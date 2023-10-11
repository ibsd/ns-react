import type { NativeProperty } from '@nativescript/capacitor';

declare module '@nativescript/capacitor' {
  export interface customNativeAPI extends nativeCustom {}
}

/**
 * Define your own custom strongly typed native helpers here.
 */
export interface nativeCustom {
  dreamBig: () => NativeProperty<string>;
  openNativeModalView: () => void;
  iosAddNotificationObserver: (notificationName: string, onReceiveCallback: (notification: NSNotification) => void) => any;
  iosRemoveNotificationObserver: (observer: any, notificationName: string) => void;

  toggleBatteryLevelListener: (callback?: (level: number) => void) => void;
  batteryLevel: () => NativeProperty<string>;
}
