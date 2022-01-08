export default class Breakpoints {
  static readonly tabletMin = 550 as const
  static readonly laptopMin = 1100 as const
  static readonly desktopMin = 1500 as const
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
}
