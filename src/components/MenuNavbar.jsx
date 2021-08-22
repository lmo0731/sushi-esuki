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
  const { query } = useRouter()
  const { home } = query || {}
  const { homeNavbarTitle, menuPages } = storage || {}
  return (
    <div className='mynavbar d-flex justify-content-center ontop'>
      <Navbar collapseOnSelect expand='md' className='w-100' variant='dark'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className='content mr-auto'>
            <Nav.Link href={`/home/${home}`}>{homeNavbarTitle}</Nav.Link>
            {
              menuPages.map((m, i) => {
                return (
                  <Nav.Link key={i} href={`${i}`}>{m.title}</Nav.Link>
                )
              })
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default MenuNavbar
