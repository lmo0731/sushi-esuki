import crypto from 'crypto'

const STRUCTURE = {
  siteTitle: { title: 'Site Title', type: 'text' },
  homeTitle: { title: 'Home title', type: 'text' },
  newsTitle: { title: 'News Title', type: 'text' },
  menuTitle: { title: 'Menu Title', type: 'text' },
  aboutBackground: { title: 'Home Background Image', type: 'image' },
  aboutTelephone: { title: 'Telephone', type: 'text' },
  addressTitle: { title: 'Address Title', type: 'text' },
  aboutAddressLine1: { title: 'Address Line 1', type: 'text' },
  aboutAddressLine2: { title: 'Address Line 2', type: 'text' },
  aboutTitle: { title: 'About Title', type: 'text' },
  aboutDescription: { title: 'About Description', type: 'textarea' },
  orderTitle: { title: 'Order Title', type: 'text' },
  orderUrl: { title: 'Order URL', type: 'text' },
  foodoraUrl: { title: 'Foodora URL', type: 'text' },
  orderNavbarTitle: { title: 'Order Navbar Title', type: 'text' },
  timeTableTitle: { title: 'Time Table Title', type: 'text' },
  timeTables: {
    title: 'Time Table',
    type: 'array',
    elements: {
      title: { title: 'Days', type: 'text' },
      description: { title: 'Hours', type: 'text' }
    }
  },
  galleryTitle: { title: 'Gallery Title', type: 'text' },
  galleryImages: {
    title: 'Gallery',
    type: 'array',
    elements: {
      image: { title: 'Image', type: 'image' }
    }
  },
  contactTitle: { title: 'Contact Title', type: 'text' },
  contactEmail: { title: 'Contact Email Address', type: 'text' },
  contactLatLong: { title: 'Contact position on Map Lat, Lng (59.355961,18.134163)', type: 'text' },
  socialTitle: { title: 'Social Title', type: 'text' },
  facebookAddress: { title: 'Facebook address link', type: 'text' },
  instagramAddress: { title: 'Instagram address link', type: 'text' },
  copyright: { title: 'Copyright', type: 'text' }
}

const SITES = {
  sites: {
    title: 'Sites',
    type: 'array',
    elements: {
      siteTitle: { title: 'Site Title', type: 'text' },
      aboutTitle: { title: 'About Title', type: 'text' },
      aboutDescription: { title: 'About Description', type: 'textarea' },
      orderTitle: { title: 'Order Title', type: 'text' },
      galleryTitle: { title: 'Gallery Title', type: 'text' },
      galleryImages: {
        title: 'Gallery',
        type: 'array',
        elements: {
          image: { title: 'Image', type: 'image' }
        }
      },
      contactTitle: { title: 'Contact Title', type: 'text' },
      contactAddress: { title: 'Concatc Address', type: 'textarea' },
      contactUs: { title: 'Contact Us', type: 'text' },
      contactEmail: { title: 'Email', type: 'string' },
      contactPhone: { title: 'Phone', type: 'phone' },
      facebookAddress: { title: 'Facebook address link', type: 'text' },
      instagramAddress: { title: 'Instagram address link', type: 'text' },
      copyright: { title: 'Copyright', type: 'text' }
    }
  }
}

const MENU = {
  menuTitle: { title: 'Menu Title', type: 'text' },
  menus: {
    title: 'Menus',
    type: 'array',
    elements: {
      title: {
        title: 'Name',
        type: 'text'
      },
      description: {
        title: 'Description',
        type: 'text'
      },
      items: {
        title: 'Menu Items',
        type: 'list',
        elements: {
          title: {
            title: 'Item Title',
            type: 'text'
          },
          price: {
            title: 'Item Price',
            type: 'text'
          },
          description: {
            title: 'Description',
            type: 'textarea'
          }
        }
      }
    }
  }
}

const toArray = (structure) => {
  const ret = []
  for (const name in structure) {
    const element = structure[name]
    element.name = name
    const { elements, ...rest } = element
    if (elements) {
      const elementArray = toArray(elements)
      ret.push({ ...rest, elements: elementArray, name })
    } else {
      ret.push({ ...rest, name })
    }
  }
  return ret
}

const PAGES = {
  home: { name: 'Admin', elements: toArray(STRUCTURE) },
  menu: { name: 'Menu', elements: toArray(MENU) },
  posts: { name: 'Posts' }
}

export default {
  SERVER_PORT: process.env.SERVER_PORT || 4000,
  LOG_PATH: process.env.LOG_PATH || 'logs',
  TMP_PATH: process.env.TMP_PATH || '/tmp',
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'public/file',
  STORAGE_PATH: process.env.STORAGE_PATH || 'storage',
  HASH: (string) => {
    const hash = crypto.createHmac('sha256', process.env.HASH_KEY || 'sushisuuni202O')
    return hash.update(string).digest('hex')
  },
  JWT_KEY: process.env.JWT_KEY || 'jwtsushifriends',
  PRIVATE_API_URL: process.env.PRIVATE_API_URL || '/api',
  PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  PAGES
}
