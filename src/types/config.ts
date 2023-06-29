export type MenuItem = {
  name: string
  path?: string
  iconCompName: string
  children?: MenuItem[]
}

export type ScreenContainerOptions = {
  width?: string | number
  height?: string | number
  screenFit?: boolean
}
