# Environment Variable Configuration

## Status

Accepted

## Context

We need a way to configure our application beyond the source code to support different deployment environments. This includes:

1. The need to manage configuration through version-controlled files
2. The requirement to provide a good developer experience with clear configuration options
3. The necessity to maintain type safety and documentation for environment variables
4. The importance of keeping sensitive information out of version control

## Decision

We will use Vite's environment variable system with TypeScript type definitions and .env files. This approach:

1. Uses Vite's built-in environment variable support
2. Maintains type safety through TypeScript definitions
3. Follows the widely adopted .env file pattern
4. Integrates with our existing Vite + TypeScript setup
5. Provides type checking and autocompletion for better developer experience

### Implementation Details

#### Environment Variable Structure

- All client-side environment variables must be prefixed with `VITE_`
- Type definitions are maintained in `src/app/types/env.d.ts`
- Example environment variables are documented in `.env.example`

#### Required Files

1. `.env` - Local environment variables (gitignored)
2. `.env.example` - Example environment variables (version controlled)
3. `src/app/types/env.d.ts` - TypeScript type definitions
4. `vite.config.ts` - Vite configuration

#### Example Type Definition

```typescript
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_MODE: "development" | "production";
  readonly VITE_API_URL: string;
  readonly VITE_API_MEDIA_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

#### Example Environment Files

```env
# .env.example
VITE_BASE_URL=/
VITE_MODE=development
VITE_API_URL=http://localhost:3000
VITE_API_MEDIA_URL=http://localhost:3000/media
```

## Consequences

### Positive

1. Type-safe environment variable access throughout the application
2. Clear documentation of available configuration options
3. Separation of configuration from source code
4. Easy local development setup with `.env.example`
5. Built-in Vite support for environment variables
6. Good developer experience with TypeScript integration

### Negative

1. All client-side environment variables must be prefixed with `VITE_`
2. Need to maintain type definitions alongside environment variables
3. Need to ensure `.env` files are properly gitignored
4. Need to validate environment variables at runtime
5. Need to keep documentation in sync with actual usage

### Neutral

1. Environment variables are only available at build time
2. Different environments (development, production) need separate configuration
