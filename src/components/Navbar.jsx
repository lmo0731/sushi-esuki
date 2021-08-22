import { useRouter } from 'next/router'
import { Nav, Navbar } from 'react-bootstrap'
import { Link as ScrollLink } from 'react-scroll'

const Link = (props) => {
  const { children = [], href, to } = props
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
  const { query } = useRouter()
  const { home } = query || {}
  const {
    homeNavbarTitle,
    menuNavbarTitle,
    orderNavbarTitle,
    galleryNavbarTitle,
    contactNavbarTitle
  } = storage || {}
  return (
    <div className='mynavbar d-flex justify-content-center ontop'>
      <Navbar collapseOnSelect expand='md' className='w-100' variant='dark'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className='content mr-auto'>
            <Nav.Link href='/'>{homeNavbarTitle}</Nav.Link>
            <Nav.Link href={`/home/${home}/menu/0`} to='about'>{menuNavbarTitle}</Nav.Link>
            <Link href='#order' to='order'>{orderNavbarTitle}</Link>
            <Link href='#gallery' to='order'>{galleryNavbarTitle}</Link>
            <Link href='#contact' to='contact'>{contactNavbarTitle}</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default MyNavbar
