// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const [authorized, setAuthorized] = useState(false);
  const { pathname } = request.nextUrl;
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/check-auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      if (data.authenticated) {
        setAuthorized(true);
      } else {
        console.error("Mauvais identifiant");
      }
    } catch (error) {
      console.error("Erreur d'authentification", error);
    }
  };

  checkAuth();

  // Bloquer l'accès aux fichiers HTML
  if (pathname.startsWith('/board.html') && !authorized) {
    return NextResponse.redirect(new URL('/index', request.url));
  }

  return NextResponse.next();
}