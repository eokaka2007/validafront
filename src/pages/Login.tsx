import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = login(username.toUpperCase(), password);

    if (success) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Somos a Unica"
      });
      navigate('/');
    } else {
      toast({
        title: "Erro no login",
        description: "Usuário ou senha incorretos",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: "#01222e",
        backgroundImage: `url("/3d-render-abstract-technology-with-flowing-particles.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay de blur */}
      <div className="absolute inset-0 backdrop-blur-sm bg-[#01222e]/30 z-0"></div>

      <Card className="w-full max-w-md relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-apple-elevated">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-[#1ad3a9]">
            Hub DIMEG
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Portal de Relatorios
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-[#1ad3a9]" />
                Usuário
              </Label>
              <Input 
                id="username"
                placeholder="Digite seu usuário"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="h-14 text-base bg-[#01222e]/30 backdrop-blur-sm border-2 border-white/10 rounded-2xl px-6 py-4 focus:border-[#1ad3a9]/50 focus:ring-0 transition-all duration-300 shadow-apple-button hover:shadow-apple-elevated"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#1ad3a9]" />
                Senha
              </Label>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="h-14 text-base bg-[#01222e]/30 backdrop-blur-sm border-2 border-white/10 rounded-2xl px-6 py-4 pr-14 focus:border-[#1ad3a9]/50 focus:ring-0 transition-all duration-300 shadow-apple-button hover:shadow-apple-elevated"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-[#1ad3a9] transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground/80 select-none pl-2">
                Utilize suas credenciais cadastradas no sistema
              </p>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-lg font-semibold rounded-2xl bg-[#1ad3a9] text-[#01222e] shadow-apple-button hover:shadow-apple-elevated transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Entrando...
                </div>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-flow rounded-2xl border border-white/10">
            <p className="text-sm text-center text-muted-foreground">
              Sistema desenvolvido para relatorios Unica SOlucoes 
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
