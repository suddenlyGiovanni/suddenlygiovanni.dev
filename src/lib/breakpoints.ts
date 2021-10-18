export default class Breakpoints {
  static readonly maxXS: 320
  static readonly maxSM: 767
  static readonly maxMD: 1023

  static get mediaQueryExtraSmallDevices() {
    return `@media (max-width: ${this.maxXS}px)` as const
  }

  static get mediaQuerySmallDevices() {
    return `@media (max-width: ${this.maxSM}px)` as const
  }

  static get mediaQueryMediumDevices() {
    return `@media (max-width: ${this.maxMD}px)` as const
  }

  static get mediaQueryTabletOnly() {
    return `@media (min-width: ${this.maxSM + 1}px) and (max-width: ${
      this.maxMD
    }px)` as const
  }

  static get mediaQueryDesktopOnly() {
    return `@media (min-width: ${this.maxMD + 1}px)` as const
  }
}
