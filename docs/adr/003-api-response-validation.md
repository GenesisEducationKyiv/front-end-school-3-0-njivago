# API Response Validation

## Status

Accepted

## Date

28-05-2025

## Context

We need a robust way to validate API responses in our application. This includes:

1. The need to ensure type safety for API responses
2. The necessity to provide clear error messages for invalid responses
3. The importance of maintaining consistent data shapes across the application
4. The need to handle both successful and error responses appropriately

## Decision

We will use Valibot schemas for API response validation with a centralized validation approach. This includes:

1. Storing response schemas in dedicated files (`api/main/{apiName}/{apiName}.schema.ts`)
2. Using a centralized validation function (`prepareResponse`) for all API response transformations
3. Implementing type-safe response handling with TypeScript
4. Providing clear error logging for validation failures

### Implementation Details

#### Schema Structure

- Each API module has its own schema file
- Schemas are defined using Valibot's schema builders
- Schemas are exported and used in both types and API definitions

#### Validation Process

1. Response schemas are defined in module-specific files
2. The `prepareResponse` utility function handles validation
3. Validation errors are logged with module and endpoint context
4. Type-safe response types are generated from schemas

#### Example Implementation

```typescript
// Schema definition (tracks.schema.ts)
export const getTracksSchema = v.object({
  id: v.string(),
  title: v.string(),
  artist: v.string(),
  // ... other fields
});

// Response type (tracks.types.ts)
export type TGetTracksResponse = PreparedResponse<typeof getTracksSchema>;

// API endpoint with validation (tracks.api.ts)
export const tracksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTracks: build.query<TGetTracksResponse, TGetTracksOptions>({
      query: createQuery("GET", "/tracks"),
      transformResponse: prepareResponse(
        getTracksSchema,
        "tracks",
        "getTracks"
      ),
    }),
  }),
});
```

## Consequences

### Positive

1. Runtime type safety for all API responses
2. Clear error messages for invalid responses
3. Consistent data structure across the application
4. TypeScript integration for better developer experience
5. Centralized validation logic
6. Easy to maintain and update schemas
7. Clear separation of concerns between API and validation logic

### Negative

1. Additional bundle size from validation library, but it serves multiple purposes (including form validations)
2. Need to maintain schemas alongside API definitions
3. Need to keep schemas in sync with API changes
4. Additional complexity in the codebase

### Neutral

1. Validation errors are logged but don't break the application
2. Schemas can be reused for both request and response validation
3. Validation can be disabled in production if needed
4. Schema definitions serve as documentation
