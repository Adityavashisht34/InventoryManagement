import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, BarChart3, ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Package className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800 truncate">
                {user?.warehouseName || 'WareHub'}
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
            <NavLink to="/inventory" icon={<Package className="h-5 w-5 mr-1" />} text="Inventory" />
            <NavLink to="/sales" icon={<ShoppingCart className="h-5 w-5 mr-1" />} text="Sales" />
            <NavLink to="/dashboard" icon={<BarChart3 className="h-5 w-5 mr-1" />} text="Dashboard" />
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg border-t border-gray-100">
          <MobileNavLink to="/inventory" icon={<Package className="h-5 w-5 mr-3" />} text="Inventory" onClick={closeMenu} />
          <MobileNavLink to="/sales" icon={<ShoppingCart className="h-5 w-5 mr-3" />} text="Sales" onClick={closeMenu} />
          <MobileNavLink to="/dashboard" icon={<BarChart3 className="h-5 w-5 mr-3" />} text="Dashboard" onClick={closeMenu} />
          <button
            onClick={() => {
              handleLogout();
              closeMenu();
              
            }}
            className="w-full flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

// Desktop navigation link component
function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center px-3 py-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
    >
      {icon}
      {text}
    </Link>
  );
}

// Mobile navigation link component
function MobileNavLink({ to, icon, text, onClick }: { to: string; icon: React.ReactNode; text: string; onClick: () => void }) {
  return (
    <Link
      to={to}
      className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-200"
      onClick={onClick}
    >
      {icon}
      {text}
    </Link>
  );
}
