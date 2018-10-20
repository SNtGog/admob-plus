import { AdBase, AdUnitIDOption, TestIds } from './base'
interface IRewardVideoPrepareOptions {
  id?: AdUnitIDOption
}
export default class RewardVideo extends AdBase {
  protected testIdForAndroid: TestIds
  protected testIdForIOS: TestIds
  public isReady(): Promise<{}>
  public load(opts?: IRewardVideoPrepareOptions): Promise<void>
  public show(): Promise<{}>
}
export {}
