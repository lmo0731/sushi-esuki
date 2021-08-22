import { useRouter } from 'next/router'
import { Nav, Navbar } from 'react-bootstrap'
import { Link as ScrollLink } from 'react-scroll'

const Link = (props) => {
  const { children = [], href, to } = props
  const router = useRouter()
  const isNotHome = false
  if (isNotHome) {
    return (
      <Nav.Link href={href}>
        {children}
      </Nav.Link>
    )
  } else {
    return (
      <ScrollLink className='nav-link' to={to} smooth spy hashSpy>
        {children}
      </ScrollLink>
    )
  }
}

const MenuNavbar = (props) => {
  const { storage } = props
  const { homeTitle = 'Sushi', aboutTitle = 'Va', newsTitle = 'News', galleryTitle = 'Gallery', menuTitle = 'Meny', contactTitle = 'Contact' } = storage || {}
  return (
    <div className='mynavbar d-flex justify-content-center ontop'>
      <Navbar collapseOnSelect expand='md' className='w-100' variant='dark'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className='content mr-auto'>
            <Link href='#header' to='header'>{homeTitle}</Link>
            <Link href='#menu1' to='menu'>{menuTitle} 1</Link>
            <Link href='#menu2' to='menu'>{menuTitle} 2</Link>
            <Link href='#menu3' to='menu'>{menuTitle} 3</Link>
            <Link href='#menu4' to='menu'>{menuTitle} 4</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default MenuNavbar
