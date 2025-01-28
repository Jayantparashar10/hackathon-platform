export const APP_CONSTANTS = {
    PAGINATION: {
      DEFAULT_LIMIT: 10,
      MAX_LIMIT: 100
    },
    CACHE: {
      TTL: 60 * 5, // 5 minutes
      REVALIDATE: 60 // 1 minute
    },
    VALIDATION: {
      PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 64
      },
      TEAM: {
        MAX_MEMBERS: 5,
        MAX_NAME_LENGTH: 30
      }
    },
    ERROR_MESSAGES: {
      UNAUTHORIZED: "Unauthorized access",
      RATE_LIMIT: "Too many requests, please try again later",
      DEFAULT: "Something went wrong"
    },
    STATUS: {
      SUCCESS: "success",
      ERROR: "error"
    }
  } as const;
  
  export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
  } as const;