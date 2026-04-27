# Contexto tecnico

## Proposito

MVP web para pymes de Peru y Latam. Detecta fugas de ventas, citas y seguimiento con IA y genera reporte light gratis mas reporte completo pagado.

## Stack real

- Next.js 16.2.4
- React 19.2.5
- TypeScript
- Tailwind CSS
- App Router

## Frontend

- `app/layout.tsx`: metadata y viewport movil.
- `app/page.tsx`: landing mobile-first.
- `app/login/page.tsx`: login mobile-first con Google via Firebase Auth.
- `app/login/google-login-button.tsx`: inicia Google Redirect Sign-In.
- `app/login/login-redirect.tsx`: procesa retorno OAuth.
- `app/diagnostico/page.tsx`: inicio visual del diagnostico.
- `app/diagnostico/auth-gate.tsx`: protege diagnostico con Firebase Auth.
- `lib/firebase.ts`: cliente Firebase.
- `app/globals.css`: estilos globales.

## Rutas

- `/`: landing con CTA principal.
- `/login`: login con Google.
- `/diagnostico`: entrada al diagnostico.

## Flujos visibles

- Usuario entra a landing.
- Usuario pulsa `Iniciar diagnostico`.
- Usuario llega a `/login`.
- Usuario entra con Google via Firebase Auth.
- Usuario llega a `/diagnostico`.
- Barra de menu solo aparece despues del login.
- Landing no usa saludo personalizado.
- Diagnostico muestra `Hola, {nombre}` cuando hay sesion.
- Landing usa paleta azul salud.
- Hero menciona perdida estimada desde S/2,500 al mes basada en ticket high-ticket referencial.

## Estado

- Sesion gestionada por Firebase Auth en cliente.
- Sin base de datos confirmada.

## Integraciones externas

- Google OAuth con Firebase Auth.
- IA, pagos, PDF y base de datos: pendientes.

## Variables de entorno

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Restricciones

- MVP primero.
- Mobile-first.
- Oferta enfocada en clinicas odontologicas y centros esteticos pequenos en Lima.
- CTA debe llevar al diagnostico.

## Decisiones observables

- UI tipo app movil.
- Paleta clara con acento amber.
- Copy basado en `docs/propuesta-valor-mvp.md` y `docs/cliente-inicial-rubro-piloto.md`.
