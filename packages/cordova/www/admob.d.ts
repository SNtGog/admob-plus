import Banner from './banner'
import Interstitial from './interstitial'
import RewardVideo from './reward-video'
declare class AdMob {
  public banner: Banner
  public interstitial: Interstitial
  public rewardVideo: RewardVideo
  private state
  private ready
  constructor();
  public setAppMuted(value: boolean): Promise<{}>
  public setAppVolume(value: number): Promise<{}>
  public setDevMode(value: any): void
}
declare const _default: AdMob
export default _default
