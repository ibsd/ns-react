import './ExploreContainer.css';
import { native } from '@nativescript/capacitor';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    console.log(`====native.isAndroid=${native.isAndroid}`);
    console.log(`====native.isIOS=${native.isIOS}`);
    native.dreamBig().get((v: any) => {
      console.log(`Capaci: ==== ${v}`)
    });
    native.batteryLevel().get((v: any) => {
      console.log(`Capaci:batteryLevel ==== ${v}`)
    });
    native.toggleBatteryLevelListener((l: any) => {
      console.log(`Capaci: bat ==== ${l}`)
    })
    // native.getpid().get((v: any) => console.log(`====pid=${v}`));
    if (native.isIOS) {
      // native.CFNotificationCenterAddObserver()
      // native.addNotificationObserver()
      // native.kNotify
    }
    /* function CFNotificationCenterAddObserver(
      center: any, 
      observer: interop.Pointer | interop.Reference<any>, 
      callBack: interop.FunctionReference<(p1: any, p2: interop.Pointer | interop.Reference<any>, p3: any, p4: interop.Pointer | interop.Reference<any>, p5: NSDictionary<any, any>) => void>, 
      name: string, 
      object: interop.Pointer | interop.Reference<any>, 
      suspensionBehavior: CFNotificationSuspensionBehavior): void; */
  }
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      <p className="ion-padding-top">
        <a onClick={handleClick}>Open Native Modal</a>
      </p>
    </div>
  );
};

export default ExploreContainer;
