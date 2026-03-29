import { Link, useLocation } from 'react-router-dom'
import { LogOut, Home, LayoutDashboard, User, Shield, PlayCircle, Info, Image, Code, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const Navbar = ({ session, setSession }) => {
  const location = useLocation()
  
  const handleLogout = () => {
    setSession(null)
    toast.success('Logged out successfully')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="glass sticky top-0 z-50 px-4 py-3 mb-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Stress Sharing
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className={`flex items-center gap-2 text-sm transition-colors ${isActive('/') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
            <Home size={18} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link to="/about" className={`flex items-center gap-2 text-sm transition-colors ${isActive('/about') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
            <Info size={18} />
            <span className="hidden sm:inline">About</span>
          </Link>
          <Link to="/gallery" className={`flex items-center gap-2 text-sm transition-colors ${isActive('/gallery') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
            <Image size={18} />
            <span className="hidden sm:inline">Gallery</span>
          </Link>
          

          {session ? (
            <>
              <Link to="/dashboard" className={`flex items-center gap-2 text-sm transition-colors ${isActive('/dashboard') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link to="/yoga" className={`flex items-center gap-2 text-sm transition-colors ${isActive('/yoga') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
                <PlayCircle size={18} />
                <span className="hidden sm:inline">Yoga</span>
              </Link>
              <Link to="/speak" className={`flex items-center gap-2 text-sm transition-colors ${isActive('/speak') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
                <MessageCircle size={18} />
                <span className="hidden sm:inline">Speak</span>
              </Link>
              <Link to="/profile" className={`flex items-center gap-2 text-sm transition-colors ${isActive('/profile') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
                <User size={18} />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              {session.user.email === 'admin@example.com' && (
                <Link to="/admin" className={`flex items-center gap-2 text-sm transition-colors ${isActive('/admin') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
                  <Shield size={18} />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors ml-4"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="px-5 py-2 rounded-full text-sm font-medium border border-white/10 hover:bg-white/5 transition-all">
                Login
              </Link>
              <Link to="/signup" className="px-5 py-2 rounded-full text-sm font-medium bg-primary hover:bg-primary/80 transition-all">
                Get Started
              </Link>
            </div>
          )}
          <Link to="/developers" className={`flex items-center gap-2 text-sm transition-colors ${isActive('/developers') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
            <Code size={18} />
            <span className="hidden sm:inline">Team</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
