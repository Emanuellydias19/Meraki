"use client";
import { usePathname } from "next/navigation";

export function Footer() {
  const location = usePathname();
    
  if (location.startsWith("/login") || location.startsWith("/register")) {
    return null; // Não renderiza o Header nessas rotas
  }
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-">
      <div className="w-full mx-auto px-8">
        <div className="grid grid-cols- gap- mb-">
          {/* Coluna  */}
          <div>
            <h className="text-white font-bold mb-">Meraki</h>
            <p className="text-gray-00 text-sm">
              Plataforma de investimentos descentralizados em Solana
            </p>
          </div>

          {/* Coluna  */}
          <div>
            <h className="text-white font-semibold mb-">Produto</h>
            <ul className="space-y- text-gray-00 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Explorar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Publicar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna  */}
          <div>
            <h className="text-white font-semibold mb-">Empresa</h>
            <ul className="space-y- text-gray-00 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna  */}
          <div>
            <h className="text-white font-semibold mb-">Legal</h>
            <ul className="space-y- text-gray-00 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Termos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center text-gray-00 text-sm">
          <p>&copy; 05 NodeHub. Todos os direitos reservados.</p>
          <div className="flex gap-">
            <a href="#" className="hover:text-white">
              Twitter
            </a>
            <a href="#" className="hover:text-white">
              Discord
            </a>
            <a href="#" className="hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
