import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-primary">404</CardTitle>
          <CardDescription className="text-lg">
            Página não encontrada
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Voltar ao Login
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
