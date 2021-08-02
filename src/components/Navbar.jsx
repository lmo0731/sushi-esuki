import { Nav, Navbar } from 'react-bootstrap'
import { useRouter } from 'next/router'
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

const MyNavbar = (props) => {
  const { storage } = props
  const { homeTitle = 'Home', aboutTitle = 'About', newsTitle = 'News', galleryTitle = 'Gallery', menuTitle = 'Meny', contactTitle = 'Contact' } = storage || {}
  return (
    <div className='mynavbar d-flex justify-content-center ontop'>
      <Navbar collapseOnSelect expand='md' className='w-100' variant='dark'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className='content mr-auto'>
            <Link href='#header' to='header'>{homeTitle}</Link>
            <Link href='#about' to='about'>{aboutTitle}</Link>
            <Nav.Link href='/posts'>{newsTitle}</Nav.Link>
            <Link href='#gallery' to='gallery'>{galleryTitle}</Link>
            <Link href='#menu' to='menu'>{menuTitle}</Link>
            <Link href='#contact' to='contact'>{contactTitle}</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default MyNavbar
