# Skill: Commit

Realiza un commit siguiendo las convenciones del proyecto.

## Uso

Invoca esta skill cuando una fase esté completa y aprobada por QA.

## Proceso

### 1. Verificación Pre-Commit

```bash
# Asegurar que no hay errores
npm run type-check
npm run lint
```

Si hay errores, NO hacer commit. Reportar los errores.

### 2. Staging

```bash
# Ver cambios
git status

# Agregar archivos de la fase
git add [archivos específicos]

# O si todos los cambios son de la fase
git add -A
```

### 3. Commit Message

Formato: `<tipo>: <descripción en español>`

Tipos:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `refactor`: Refactorización sin cambio de funcionalidad
- `style`: Cambios de formato/estilo
- `docs`: Documentación
- `chore`: Tareas de mantenimiento

Ejemplos:
```bash
git commit -m "feat: implementar store de Zustand con persistencia"
git commit -m "feat: agregar modal de nuevo alimento"
git commit -m "fix: corregir cálculo de total de calorías"
```

### 4. Confirmación

```bash
# Verificar el commit
git log -1 --oneline
```

## Output

```
## Commit Realizado ✅

- Hash: [abc1234]
- Mensaje: feat: [descripción]
- Archivos: [N] archivos modificados

### Cambios incluidos:
- src/components/NewFile.tsx (nuevo)
- src/stores/foodStore.ts (modificado)
```

## Reglas

- UN commit por fase completada
- Mensaje descriptivo y en español
- Solo commitear código que pasa verificación
- No incluir archivos no relacionados con la fase
