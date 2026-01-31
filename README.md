# Claude Code + SDD: Flujo Rápido

Guía para replicar el flujo Spec-Driven Development con Claude Code visto en la clase.

---

## 1. Setup del Proyecto

```bash
# Crear proyecto Next.js
npx create-next-app@latest mi-app --typescript --tailwind --eslint --app --src-dir

cd mi-app

# Instalar Zustand (o tus dependencias)
npm install zustand
```

---

## 2. Estructura de Claude

```bash
# Crear carpetas
mkdir -p .claude/rules .claude/agents .claude/skills specs
```

### Archivos a crear:

```
mi-app/
├── CLAUDE.md              # Config global del proyecto
├── .claude/
│   ├── rules/             # Guías de código
│   │   └── frontend.md
│   ├── agents/            # Roles especializados
│   │   ├── architect.md   # Genera specs
│   │   ├── pm.md          # Divide en fases
│   │   ├── frontend.md    # Implementa
│   │   └── qa.md          # Valida
│   └── skills/            # Procedimientos
│       └── commit/
│           └── SKILL.md
└── specs/                 # Specs y planes
    ├── SPEC.md
    └── PLAN.md
```

---

## 3. Iniciar Claude Code

```bash
claude
```

Dentro de Claude Code:
```
/init
```

---

## 4. Flujo SDD

### Paso 1: Spec (con @architect)

```
@architect Quiero crear [DESCRIPCIÓN DE TU APP].

Funcionalidades:
- Feature 1
- Feature 2

Stack: Next.js, TypeScript, Zustand, Tailwind

Genera specs/SPEC.md
```

### Paso 2: Plan (con @pm)

```
@pm Lee specs/SPEC.md y crea un plan de implementación dividido en fases de 5-10 min cada una. Guarda en specs/PLAN.md
```

### Paso 3: Implementar (con @frontend)

```
@frontend Implementa la Fase 1 según specs/PLAN.md
```

### Paso 4: Validar (con @qa)

```
@qa Revisa el código de la Fase 1
```

### Paso 5: Commit (con /commit)

```
/commit
```

### Repetir pasos 3-5 para cada fase.

---

## 5. Ralph Loop (Opcional)

Para tareas autónomas con criterio claro de éxito:

```
# Instalar plugin
/plugin install ralph-loop@claude-plugins-official

# Ejecutar
/ralph-loop:ralph-loop "TAREA. Cuando termines escribe DONE." --max-iterations 5 --completion-promise "DONE"
```

---

## Resumen Visual

```
┌─────────────┐
│  IDEA       │
└─────┬───────┘
      ▼
┌─────────────┐
│ @architect  │ → specs/SPEC.md
└─────┬───────┘
      ▼
┌─────────────┐
│ @pm         │ → specs/PLAN.md
└─────┬───────┘
      ▼
┌─────────────────────────────────┐
│  Por cada fase:                 │
│                                 │
│  @frontend → implementa         │
│  @qa       → valida             │
│  /commit   → guarda             │
│                                 │
└─────────────────────────────────┘
      ▼
┌─────────────┐
│  APP LISTA  │
└─────────────┘
```

---

## Tips

- **RAM vs Disco**: Lo que importa mañana → al disco (archivos)
- **Fases pequeñas**: 5-10 min máximo
- **Verificar siempre**: `npm run lint && npm run type-check`
- **Un commit por fase**: Atómicos y descriptivos
- **Mobile-first**: Diseña para móvil primero

---

## Recursos

- [Claude Code Docs](https://docs.anthropic.com/claude-code)
- [MCP Protocol](https://modelcontextprotocol.io)