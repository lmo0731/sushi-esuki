import crypto from 'crypto'

const STRUCTURE = {
  siteTitle: { title: 'Site Title', type: 'text' },
  siteBackground: { title: 'Site Background Image', type: 'image' },
  sites: {
    type: 'array',
    title: 'Restaurant',
    elements: {
      homeNavbarTitle: { title: 'Home Navbar title', type: 'text' },
      menuNavbarTitle: { title: 'Menu Navbar title', type: 'text' },
      orderNavbarTitle: { title: 'Order Navbar title', type: 'text' },
      galleryNavbarTitle: { title: 'Gallery Navbar title', type: 'text' },
      contactNavbarTitle: { title: 'Contact Navbar title', type: 'text' },
      //
      restaurantName: { title: 'Restaurant Name', type: 'text' },
      addressLine1: { title: 'Restaurant Address Line 1', type: 'text' },
      addressLine2: { title: 'Restaurant Address Line 2', type: 'text' },
      restaurantBackground: { title: 'Restaurant Background Image', type: 'image' },
      //
      aboutTitle: { title: 'About Title', type: 'text' },
      aboutText: { title: 'About Text', type: 'textarea' },
      //
      orderText: { title: 'Order Text', type: 'text' },
      orderUrl: { title: 'Order Link', type: 'text' },
      orderImage: { title: 'Order Image', type: 'image' },
      //
      galleryTitle: { title: 'Gallery Title', type: 'text' },
      galleryImages: {
        title: 'Gallery',
        type: 'array',
        elements: {
          image: { title: 'Image', type: 'image' }
        }
      },
      //
      contactTitle: { title: 'Contact Title', type: 'text' },
      contactEmail: { title: 'Contact Email', type: 'text' },
      contactPhone: { title: 'Contact Phone', type: 'text' },
      //
      timeTableTitle: { title: 'Time Table Title', type: 'text' },
      timeTables: {
        title: 'Time Table',
        type: 'array',
        elements: {
          title: { title: 'Days', type: 'text' },
          description: { title: 'Hours', type: 'text' }
        }
      },
      //
      facebookAddress: { title: 'Facebook address link', type: 'text' },
      instagramAddress: { title: 'Instagram address link', type: 'text' },
      //
      copyright: { title: 'Copyright', type: 'text' },
      //
      menuTitle: { title: 'Menu Title', type: 'text' },
      menuPages: {
        title: 'Menu Pages',
        type: 'array',
        elements: {
          title: {
            title: 'Menu Page Name',
            type: 'text'
          },
          description: {
            title: 'Description',
            type: 'text'
          },
          menuBackground: {
            title: 'Menu Background Image',
            type: 'image'
          },
          menus: {
            title: 'Menu',
            type: 'array',
            elements: {
              title: { title: 'Menu Title', type: 'text' },
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
                    type: 'text'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

const MENU = {

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
  home: { name: 'Admin', elements: toArray(STRUCTURE) }
}

export default {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  LOG_PATH: process.env.LOG_PATH || 'logs',
  TMP_PATH: process.env.TMP_PATH || '/tmp',
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'public/file',
  STORAGE_PATH: process.env.STORAGE_PATH || 'storage',
  HASH: (string) => {
    const hash = crypto.createHmac('sha256', process.env.HASH_KEY || 'sushisuuni202O')
    return hash.update(string).digest('hex')
  },
  JWT_KEY: process.env.JWT_KEY || '1H2Ht76Vtw6cs9JrZo0Qh',
  PRIVATE_API_URL: process.env.PRIVATE_API_URL || '/api',
  PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  PAGES
}
