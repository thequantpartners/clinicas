# Project Context

## Resumen

IA Consultor App es un MVP web para diagnosticar fugas de ventas, citas y seguimiento en pequenas clinicas odontologicas y centros esteticos.

## Stack

- Next.js 16.2.4
- React 19.2.5
- TypeScript
- Tailwind CSS

## Modulos

- Landing mobile-first.
- Login Google con Firebase Auth.
- Entrada visual al diagnostico.

## Rutas

- `/`
- `/login`
- `/diagnostico`

## Flujo visible

- Landing -> CTA -> login -> Firebase Google OAuth -> diagnostico.
- Menu inferior solo post-login.

## Integraciones

- Firebase Auth con Google OAuth.
- Pendientes: OpenAI, PDF, pagos, DB.

## Notas

- `/docs/context.md` es fuente primaria.
- Este archivo es resumen derivado.

## Riesgos

- Diagnostico aun no captura respuestas reales.
- No existe backend ni contrato API implementado.
