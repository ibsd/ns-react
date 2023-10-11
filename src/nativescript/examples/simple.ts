native.dreamBig = () => {
  const message = 'Dream big!';
  if (native.isAndroid) {
    return new java.lang.String(message);
  } else {
    return NSString.alloc().initWithString(message);
  }
};
