/**
 * @module shared.messages
 * @description Centralized message map for consistent error and success responses.
 * Structure: Grouped by type (ERROR, SUCCESS), with reusable fragments for entities, actions, and states.
 * Usage: throw new AppError(MessageMap.ERROR.USER.NOT_FOUND);
 * Benefits: Compact, reusable, maintainable, type-safe with as const.
 */

export const MessageMap = {
  ERROR: {
    DEFAULT: {
      INTERNAL_ERROR: 'internal_server_error',
      UNAUTHORIZED: 'not_authorized',
      NOT_FOUND: 'not_found',
      INVALID: 'is_invalid',
      NOT_ENCRYPTED: 'not_encrypted',
      COMPARISON_FAILED: 'comparison_failed',
      IN_USE: 'in_use',
      SERVER: 'error_server',
    },
    FILES: {
      SERVER: {
        FAILED: 'failed_to_start_server',
      },
    },
  },
  SUCCESS: {
    DEFAULT: {
      SUCCESS: 'operation_successful',
      CREATED: 'create_with_successful',
    },
    FILES: {
      SERVER: {
        RUN: 'application_running_on_port',
      },
    },
  },
} as const;
