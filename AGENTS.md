# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Diseño de arquitectura para aplicación frontend en React**.

| | |
|---|---|
| Tema | aplicación de estilos y tácticas de arquitectura en contextos de desarrollo frontend con React, incluyendo cloud |
| Nivel | trainee-l1 |
| Chapter | Frontend |
| Especialidad | React |
| Stack | TypeScript / React 19 |
| Patron arquitectonico | patrón de componentes con separación de responsabilidades (contenedor/presentacional) y módulos lazy-loaded |
| Tiempo estimado | 3 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, vite.config.ts y tsconfig.json en la raiz`
- `src/main.tsx como entry point`
- `src/app con el arbol de rutas`
- `src/features con componentes contenedores y sus hooks`
- `src/shared con componentes presentacionales`
- `src/services con los clientes HTTP`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET. `@types/react-router-dom` ya no se publica para v6+, React Router trae sus tipos.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.

Dependencias:

- react 19.0.0-rc.0
- react-dom 19.0.0-rc.0
- react-router-dom 6.22.3
- @tanstack/react-query 5.28.0
- zustand 4.5.2
- axios 1.6.8
- vite 5.2.8
- @vitejs/plugin-react 4.2.1
- @types/react 18.2.79
- @types/react-dom 18.2.25
- typescript 5.4.5
- eslint 8.57.0
- @typescript-eslint/eslint-plugin 7.7.1
- prettier 3.2.5
- vitest 1.5.0
- @testing-library/react 15.0.2

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Identificación de estilos y tácticas de arquitectura**: Documento que detalla los estilos y tácticas de arquitectura seleccionados y su justificación.
- **Fase 2 — Aplicación de estilos y tácticas en un mockup de la aplicación**: Mockup de la aplicación frontend con una explicación detallada de cómo se han aplicado los estilos y tácticas de arquitectura.
- **Fase 3 — Evaluación y ajuste de la arquitectura**: Versión actualizada del mockup y la explicación de la arquitectura, con los ajustes realizados y una explicación de los cambios.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (1)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/app/routes.tsx` — `RouteConfig.map`
      Se invoca `map` sobre `RouteConfig`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (18)

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `src/main.tsx`
- `src/app/App.tsx`
- `src/types/index.ts`
- `src/features/dashboard/DashboardContainer.tsx`
- `src/features/dashboard/DashboardView.tsx`
- `src/features/accounts/AccountsContainer.tsx`
- `src/features/accounts/AccountsView.tsx`
- `src/services/api.ts`
- `src/hooks/useFetch.ts`
- `src/shared/components/Button.tsx`
- `src/shared/components/Card.tsx`
- `src/utils/formatters.ts`
- `src/app/routes.tsx`
- `public/index.html`
- `README.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/app`
- `src/features`
- `src/shared`
- `src/services`
- `src/hooks`
- `src/types`
- `src/utils`
- `public`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **patrón de componentes con separación de responsabilidades (contenedor/presentacional) y módulos lazy-loaded**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee
- Brecha que el reto ataca: Identifica claramente los estilos y tácticas de arquitectura y los ha aplicado en varios contextos, lo cuál debe incluir la nube.
- Mision: Candidato en etapa inicial de aprendizaje, trabajando en desarrollo frontend con React

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
