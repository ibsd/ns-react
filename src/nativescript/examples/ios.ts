let iosNotificationObserverClass;
let iosNotificationObservers: Array<any>;

function ensureNotificationObserverClass() {
  if (iosNotificationObserverClass) {
    return;
  }

  @NativeClass
  class NotificationObserver extends NSObject {
    private _onReceiveCallback: (notification: NSNotification) => void;

    public static initWithCallback(onReceiveCallback: (notification: NSNotification) => void): NotificationObserver {
      const observer = <NotificationObserver>super.new();
      observer._onReceiveCallback = onReceiveCallback;

      return observer;
    }

    public onReceive(notification: NSNotification): void {
      this._onReceiveCallback(notification);
    }

    public static ObjCExposedMethods = {
      onReceive: { returns: interop.types.void, params: [NSNotification] },
    };
  }

  iosNotificationObserverClass = NotificationObserver;
}

native.iosAddNotificationObserver = (notificationName: string, onReceiveCallback: (notification: NSNotification) => void) => {
  ensureNotificationObserverClass();
  const observer = iosNotificationObserverClass.initWithCallback(onReceiveCallback);
  NSNotificationCenter.defaultCenter.addObserverSelectorNameObject(observer, 'onReceive', notificationName, null);
  if (!iosNotificationObservers) {
    iosNotificationObservers = [];
  }
  iosNotificationObservers.push(observer);
  return observer;
}

native.iosRemoveNotificationObserver = (observer: any, notificationName: string) => {
  if (iosNotificationObservers) {
    const index = iosNotificationObservers.indexOf(observer);
    if (index >= 0) {
      iosNotificationObservers.splice(index, 1);
      NSNotificationCenter.defaultCenter.removeObserverNameObject(observer, notificationName, null);
    }
  }
}
