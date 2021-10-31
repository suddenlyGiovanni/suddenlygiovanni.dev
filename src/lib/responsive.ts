export default class Breakpoints {
  static readonly tabletMin = 550 as const
  static readonly laptopMin = 1100 as const
  static readonly desktopMin = 1500 as const
  /**
   * @deprecated
   */
  static readonly maxXS = 320 as const

  /**
   * @deprecated
   */
  static readonly maxSM = 767 as const

  /**
   * @deprecated
   */
  static readonly maxMD = 1023 as const
}

export class Queries {
  static get mobile() {
    return `(max-width: ${Breakpoints.tabletMin / 16}rem)` as const
  }

  static get tabletAndUp() {
    return `(min-width: ${Breakpoints.tabletMin / 16}rem)` as const
  }

  static get laptopAndUp() {
    return `(min-width: ${Breakpoints.laptopMin / 16}rem)` as const
  }

  static get desktopAndUp() {
    return `(min-width: ${Breakpoints.desktopMin / 16}rem)` as const
  }

  /**
   * @deprecated
   */
  static get mediaQueryExtraSmallDevices() {
    return `@media (max-width: ${Breakpoints.maxXS}px)` as const
  }

  /**
   * @deprecated
   */
  static get mediaQuerySmallDevices() {
    return `@media (max-width: ${Breakpoints.maxSM}px)` as const
  }

  /**
   * @deprecated
   */
  static get mediaQueryMediumDevices() {
    return `@media (max-width: ${Breakpoints.maxMD}px)` as const
  }

  /**
   * @deprecated
   */
  static get mediaQueryTabletOnly() {
    return `@media (min-width: ${Breakpoints.maxSM + 1}px) and (max-width: ${
      Breakpoints.maxMD
    }px)` as const
  }

  /**
   * @deprecated
   */
  static get mediaQueryDesktopOnly() {
    return `@media (min-width: ${Breakpoints.maxMD + 1}px)` as const
  }
}
