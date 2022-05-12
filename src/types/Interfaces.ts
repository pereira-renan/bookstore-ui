export interface Reducers {
  counterReducer: number
  shoppingCartReducer: ShoppingCartReducer
  authReducer: boolean
  _persist: Persist
}

export interface ShoppingCartReducer {
  cartItems: CartItem[]
  cartTotalQuantity: number
  cartTotalAmount: any
}

export interface CartItem {
  kind: string
  bookId: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
  saleInfo: any
  accessInfo: any
  searchInfo: any
  cartQuantity: number
}

export interface VolumeInfo {
  volumeInfoId: string
  title: string
  authors: any[]
  publisher: string
  publishedDate: string
  description: string
  readingModes: any
  printType: string
  categories: any[]
  averageRating: number
  ratingsCount: number
  maturityRating: string
  allowAnonLogging: boolean
  contentVersion: string
  panelizationSummary: any
  imageLinks: ImageLinks
  language: string
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
  subtitle: string
  pageCount: number
}

export interface ImageLinks {
  imageLinksId: string
  smallThumbnail: string
  thumbnail: string
}

export interface Persist {
  version: number
  rehydrated: boolean
}
