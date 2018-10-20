import { AdBase, AdUnitIDOption, TestIds } from './base'
interface IInterstitialPrepareOptions {
  id?: AdUnitIDOption
}
export default class Interstitial extends AdBase {
  protected testIdForAndroid: TestIds
  protected testIdForIOS: TestIds
  public load(opts?: IInterstitialPrepareOptions): Promise<void>
  public show(): Promise<{}>
}
export {}
