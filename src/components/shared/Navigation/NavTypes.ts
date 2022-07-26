// <--- NavItemType --->
export interface MegamenuItem {
  id: string
  image: string
  title: string
  items: NavItemType[]
}
export interface NavItemType {
  id: string
  name: string
  isNew?: boolean
  href: string
  targetBlank?: boolean
  children?: NavItemType[]
  megaMenu?: MegamenuItem[]
  type?: 'dropdown' | 'megaMenu' | 'none'
}

export interface NavigationItemProps {
  menuItem: NavItemType
}
