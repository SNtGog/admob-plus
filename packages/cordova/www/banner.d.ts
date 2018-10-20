import { AdBase, AdUnitIDOption, TestIds } from './base'
interface IBannerShowOptions {
  id?: AdUnitIDOption
}
export default class Banner extends AdBase {
  protected testIdForAndroid: TestIds
  protected testIdForIOS: TestIds
  public show(opts?: IBannerShowOptions): Promise<{}>
  public hide(): Promise<{}>
}
export {}
