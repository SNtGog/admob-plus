'use strict'

const cordova$1 = require('cordova')

function execAsync(action, args) {
  return new Promise((resolve, reject) => {
    cordova$1.exec(resolve, reject, 'AdMob' /* Service */, action, args)
  })
}
function fireDocumentEvent(eventName, data = null) {
  const event = new CustomEvent(eventName, { detail: data })
  document.dispatchEvent(event)
}
function waitEvent(successEvent, failEvent = '') {
  return new Promise((resolve, reject) => {
    document.addEventListener(
      successEvent,
      event => {
        resolve(event)
      },
      false,
    )
    if (failEvent) {
      document.addEventListener(
        failEvent,
        failedEvent => {
          reject(failedEvent)
        },
        false,
      )
    }
  })
}
class AdBase {
  constructor(state) {
    this.state = state
  }

  get testAdUnitID() {
    switch (this.state.platform) {
      case 'android' /* android */:
        return this.testIdForAndroid
      case 'ios' /* ios */:
        return this.testIdForIOS
    }
  }

  resolveAdUnitID(adUnitID) {
    if (adUnitID === 'test' || this.state.devMode) {
      return this.testAdUnitID
    }
    if (!adUnitID) {
      throw new Error('adUnitID is missing')
    }
    if (typeof adUnitID === 'string') {
      return adUnitID
    }
    return adUnitID[this.state.platform]
  }
}

class Banner extends AdBase {
  constructor() {
    super(...arguments)
    this.testIdForAndroid =
      'ca-app-pub-3940256099942544/6300978111' /* banner_android */
    this.testIdForIOS =
      'ca-app-pub-3940256099942544/2934735716' /* banner_ios */
  }

  show(opts = {}) {
    return execAsync('banner_show' /* banner_show */, [
      Object.assign({}, opts, { adUnitID: this.resolveAdUnitID(opts.id) }),
    ])
  }

  hide() {
    return execAsync('banner_hide' /* banner_hide */)
  }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(((resolve, reject) => {
    function fulfilled(value) {
      try {
        step(generator.next(value))
      } catch (e) {
        reject(e)
      }
    }
    function rejected(value) {
      try {
        step(generator.throw(value))
      } catch (e) {
        reject(e)
      }
    }
    function step(result) {
      result.done
        ? resolve(result.value)
        : new P((resolve => {
          resolve(result.value)
        })).then(fulfilled, rejected)
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  }))
}

class Interstitial extends AdBase {
  constructor() {
    super(...arguments)
    this.testIdForAndroid =
      'ca-app-pub-3940256099942544/1033173712' /* interstitial_android */
    this.testIdForIOS =
      'ca-app-pub-3940256099942544/4411468910' /* interstitial_ios */
  }

  load(opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      yield execAsync('interstitial_load' /* interstitial_load */, [
        Object.assign({}, opts, { adUnitID: this.resolveAdUnitID(opts.id) }),
      ])
      yield waitEvent(
        'admob.interstitial.load' /* interstitial_load */,
        'admob.interstitial.load_fail' /* interstitial_load_fail */,
      )
    })
  }

  show() {
    return execAsync('interstitial_show' /* interstitial_show */)
  }
}

class RewardVideo extends AdBase {
  constructor() {
    super(...arguments)
    this.testIdForAndroid =
      'ca-app-pub-3940256099942544/5224354917' /* reward_video_android */
    this.testIdForIOS =
      'ca-app-pub-3940256099942544/1712485313' /* reward_video_ios */
  }

  isReady() {
    return execAsync('reward_video_is_ready' /* reward_video_is_ready */)
  }

  load(opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      yield execAsync('reward_video_load' /* reward_video_load */, [
        Object.assign({}, opts, { adUnitID: this.resolveAdUnitID(opts.id) }),
      ])
      yield waitEvent(
        'admob.reward_video.load' /* reward_video_load */,
        'admob.reward_video.load_fail' /* reward_video_load_fail */,
      )
    })
  }

  show() {
    return execAsync('reward_video_show' /* reward_video_show */)
  }
}

class AdMobState {
  constructor() {
    this.devMode = false
    this.platform = typeof cordova !== 'undefined' ? cordova.platformId : ''
  }
}

class AdMob {
  constructor() {
    const state = new AdMobState()
    this.state = state
    this.banner = new Banner(state)
    this.interstitial = new Interstitial(state)
    this.rewardVideo = new RewardVideo(state)
    document.addEventListener(
      'deviceready',
      () => {
        this.ready()
      },
      false,
    )
  }

  setAppMuted(value) {
    return execAsync('set_app_muted' /* set_app_muted */, [value])
  }

  setAppVolume(value) {
    return execAsync('set_app_volume' /* set_app_volume */, [value])
  }

  setDevMode(value) {
    this.state.devMode = value
  }

  ready() {
    cordova$1.exec(
      event => {
        this.state.applicationId = event.data.applicationId
        fireDocumentEvent(event.type, event.data)
      },
      err => {
        alert(err)
      },
      'AdMob' /* Service */,
      'ready' /* ready */,
    )
  }
}
const admob = new AdMob()

module.exports = admob
// # sourceMappingURL=admb345.js.map
