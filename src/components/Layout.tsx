import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogOut, BarChart3, ShoppingCart, TrendingUp, Package } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { userType, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!userType) return <>{children}</>;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/01e184b2-5015-4567-8793-68172c72f117.png" 
              alt="Pampeana Logo" 
              className="h-10 w-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-foreground">Plataforma de Cotação</h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            {userType === 'admin' && (
              <>
                <Button
                  variant={isActive('/admin') ? 'default' : 'ghost'}
                  asChild
                >
                  <Link to="/admin">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button
                  variant={isActive('/admin/quotation') ? 'default' : 'ghost'}
                  asChild
                >
                  <Link to="/admin/quotation">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cotação de Produtos
                  </Link>
                </Button>
                <Button
                  variant={isActive('/admin/history') ? 'default' : 'ghost'}
                  asChild
                >
                  <Link to="/admin/history">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Histórico de Preços
                  </Link>
                </Button>
              </>
            )}
            
            {userType === 'supplier' && (
              <Button
                variant={isActive('/supplier') ? 'default' : 'ghost'}
                asChild
              >
                <Link to="/supplier">
                  <Package className="mr-2 h-4 w-4" />
                  Meus Produtos
                </Link>
              </Button>
            )}
            
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;