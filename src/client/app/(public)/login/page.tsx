import React from 'react';
import './Login.css';

// O tipo de 'event' é explicitamente definido aqui: React.FormEvent
function Login() {
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica de login aqui
    console.log("Tentativa de Login");
  };

  return (
    <div className="background-container">
      {/* O fundo abstrato é feito com CSS, a div só existe para aplicar o estilo */}
      
      <div className="login-box">
        
        <h1 className="title">Faça o Login</h1>
        
        {/* O TypeScript agora sabe que handleLogin recebe um evento de formulário */}
        <form onSubmit={handleLogin} className="login-form"> 
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="" 
              required 
              className="input-field"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input 
              type="password" 
              id="senha" 
              placeholder="" 
              required 
              className="input-field"
            />
          </div>
          
          <a href="/esqueci-minha-senha" className="forgot-password">
            Esqueci minha senha
          </a>
          
          <button type="submit" className="login-button">
            Entrar
          </button>
          
        </form>
        
        <a href="/criar-conta" className="create-account-link">
          Ainda não tenho uma conta
        </a>
        
      </div>
    </div>
  );
}

export default Login;