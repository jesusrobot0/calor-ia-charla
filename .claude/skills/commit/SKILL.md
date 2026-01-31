---
name: commit
description: Realiza un commit atómico siguiendo las convenciones del proyecto. Usar cuando una fase está completa y aprobada por QA, o cuando el usuario pide commitear cambios.
disable-model-invocation: true
allowed-tools: Bash, Read, Grep, Glob
---

Realiza un commit atómico siguiendo las convenciones del proyecto calor-ia.

## Proceso

### 1. Verificación Pre-Commit

Ejecutar ambos comandos. Si alguno falla, NO hacer commit y reportar los errores.

```bash
npx tsc --noEmit       # Type-check
npm run lint           # ESLint
```

### 2. Analizar cambios

```bash
git status
git diff --staged
git diff
git log --oneline -5
```

Revisar qué archivos fueron modificados y asegurarse de que todos corresponden a la fase/tarea actual.

### 3. Staging

Agregar archivos específicos relacionados con la tarea. NUNCA usar `git add -A` o `git add .` sin revisar primero. Excluir archivos sensibles (.env, credenciales) y archivos no relacionados.

```bash
git add src/components/NuevoComponente.tsx src/stores/foodStore.ts
```

### 4. Commit

Formato del mensaje: `<tipo>: <descripción en español>`

Tipos:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `refactor`: Refactorización sin cambio de funcionalidad
- `style`: Cambios de formato/estilo
- `docs`: Documentación
- `chore`: Tareas de mantenimiento

Usar HEREDOC para el mensaje y siempre incluir Co-Authored-By:

```bash
git commit -m "$(cat <<'EOF'
feat: implementar store de Zustand con persistencia

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

### 5. Verificación Post-Commit

```bash
git log -1 --oneline
git status
```

## Reglas

- Un commit por fase completada
- Mensaje descriptivo en español, enfocado en el "por qué"
- Solo commitear código que pasa type-check y lint
- Agregar archivos específicos, nunca `git add -A` sin verificar
- Siempre incluir `Co-Authored-By` al final del mensaje
- No hacer push a menos que el usuario lo pida explícitamente
