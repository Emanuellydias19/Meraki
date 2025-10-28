"use client";
import { usePathname } from "next/navigation";

export function Footer() {
  const location = usePathname();
    
  if (location.startsWith("/login") || location.startsWith("/register")) {
    return null; // Não renderiza o Header nessas rotas
  }
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="w-full mx-auto px-8">
        <div className="grid grid-cols-4 gap-12 mb-12">
          {/* Coluna 1 */}
          <div>
            <h3 className="text-white font-bold mb-4">Meraki</h3>
            <p className="text-gray-400 text-sm">
              Plataforma de investimentos descentralizados em Solana
            </p>
          </div>

          {/* Coluna 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
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

          {/* Coluna 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
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

          {/* Coluna 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
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
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2025 NodeHub. Todos os direitos reservados.</p>
          <div className="flex gap-4">
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
