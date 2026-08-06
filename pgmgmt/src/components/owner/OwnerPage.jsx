import { useState } from 'react'
import { clearAuthUser, getAuthUser } from '../../auth'
import { useNavigate } from 'react-router-dom'
import './OwnerPage.scss'

const ownerMenuItems = [
  { label: 'Dashboard', icon: 'bi-speedometer2' },
  { label: 'Room Allocation', icon: 'bi-door-closed' },
  { label: 'Rent Payments', icon: 'bi-cash-stack' },
  { label: 'Expenses', icon: 'bi-receipt' },
  { label: 'Complaints', icon: 'bi-chat-left-text' },
  { label: 'Notices', icon: 'bi-bell' },
  { label: 'Food Menu', icon: 'bi-card-text' },
  { label: 'Inventory', icon: 'bi-box-seam' },
  { label: 'Tenants', icon: 'bi-people' },
  { label: 'Staff Management', icon: 'bi-person-badge' },
  { label: 'Hiring - Open Positions', icon: 'bi-briefcase' },
  { label: 'Room Cleaning Status', icon: 'bi-brush' },
  { label: 'Visitor Management', icon: 'bi-door-open' },
  { label: 'Tenant Reviews', icon: 'bi-star' },
  { label: 'Logout', icon: 'bi-box-arrow-right' }
]

function OwnerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('Dashboard')
  const user = getAuthUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuthUser()
    navigate('/')
  }

  const handleMenuClick = (label) => {
    if (label === 'Logout') {
      handleLogout()
      return
    }

    setSelectedMenu(label)
    setSidebarOpen(false)
  }

  return (
    <div className="owner-shell">
      <aside className={`owner-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>Owner Menu</h2>
        <nav>
          {ownerMenuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`owner-link btn btn-transparent ${selectedMenu === item.label ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.label)}
            >
              <i className={`bi ${item.icon} menu-icon`} />
              <span className="label">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className={`owner-main ${sidebarOpen ? 'open' : ''}`}>
        <div className="owner-bar">
          <button
            type="button"
            className={`hamburgerMenu ${sidebarOpen ? 'open' : ''}`}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            onClick={() => setSidebarOpen((open) => !open)}
          >
            <span className="hamburgerMenu-lines" />
          </button>
          <div>
            <p style={{ margin: 0, color: '#6b7280' }}>Owner portal</p>
            <h3 style={{ margin: 0, fontSize: '20px', color: '#172338' }}>
              {user?.username || 'Owner'}
            </h3>
          </div>
        </div>

        <section className="owner-content">
          <h1 className="owner-heading">Welcome back</h1>
          <p className="owner-subtitle">
            You are signed in as <strong>{user?.role || 'owner'}</strong>.
          </p>

          <div className="owner-info">
            <div className="owner-card">
              <h3>Owner control panel</h3>
              <p>
                Use the menu to navigate owner features like room allocation,
                rent payments, complaints, and tenant management.
              </p>
            </div>
            <div className="owner-card">
              <h3>Menu behavior</h3>
              <p>
                Click the menu button to open the sidebar with a smooth fade
                and slide animation.
              </p>
            </div>
          </div>

          <div className="owner-empty">
            Owner content screens will appear here.
          </div>
        </section>
      </main>
    </div>
  )
}

export default OwnerPage
