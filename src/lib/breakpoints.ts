export const maxXS = 320
export const maxSM = 767
export const maxMD = 1023

export const bpMaxXS = `@media (max-width: ${maxXS}px)`
export const bpMaxSM = `@media (max-width: ${maxSM}px)`
export const bpMaxMD = `@media (max-width: ${maxMD}px)`

export const bpTabletOnly = `@media (min-width: ${
  maxSM + 1
}px) and (max-width: ${maxMD}px)`
export const bpDesktopOnly = `@media (min-width: ${maxMD + 1}px)`
