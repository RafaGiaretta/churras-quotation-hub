import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { UserCog, Truck } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    login('admin');
    navigate('/admin');
  };

  const handleSupplierLogin = () => {
    login('supplier', 'A'); // Simula login como Fornecedor A
    navigate('/supplier');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo e Título */}
        <div className="text-center space-y-4">
          <img 
            src="/lovable-uploads/01e184b2-5015-4567-8793-68172c72f117.png" 
            alt="Pampeana Logo" 
            className="h-20 w-20 mx-auto rounded-full shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Plataforma de Cotação</h1>
            <p className="text-muted-foreground mt-2">Sistema de gestão para churrascarias</p>
          </div>
        </div>

        {/* Botões de Login */}
        <div className="space-y-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleAdminLogin}>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <UserCog className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Administrador</CardTitle>
              <CardDescription>
                Acesse o dashboard completo com relatórios e cotações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                Entrar como Administrador
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleSupplierLogin}>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                <Truck className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Fornecedor</CardTitle>
              <CardDescription>
                Gerencie seus produtos e atualize preços
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary" size="lg">
                Entrar como Fornecedor
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Sistema de demonstração - Sem autenticação real
        </div>
      </div>
    </div>
  );
};

export default Login;