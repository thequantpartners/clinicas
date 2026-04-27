# Contrato tecnico

## Contrato confirmado

- No hay endpoints propios confirmados.
- Firebase Auth SDK inicia Google OAuth desde cliente.

## Contrato inferido

Pendiente de validacion:

- Diagnostico requiere usuario Firebase Auth en cliente.
- Diagnostico deberia enviar respuestas estructuradas.
- IA deberia devolver analisis validado por schema.
- Pago deberia desbloquear reporte completo.

## Modelos pendientes

- User
- Diagnosis
- Answer
- Report
- Payment

## Errores

No confirmados en el repositorio.

## Changelog

- 2026-04-26: Creacion inicial. Tipo: non-breaking. Impacto: documenta ausencia de contrato implementado.
- 2026-04-26: Reemplaza Auth.js por Firebase Auth Google OAuth. Tipo: non-breaking. Impacto: diagnostico requiere sesion cliente.
