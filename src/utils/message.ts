export const MessageMap = {
  ERROR: {
    EMAIL_OR_PASSWORD_INCORRECT: 'email_password_incorrect',
    DOCUMENT_INCORRET: 'docCompany_incorrect',
    INVALID_USER_TYPE: 'Invalid_user_type',
    NO_TOKEN_REGISTER: 'do_you_not_can_create_other_user_by_this_route',
    PASSWORD: {
      NOT_UPDATE: 'password_not_update',
      NOT_ENCRYPTED: 'password_not_can_was_encripted',
      COMPARISON_FAILED: 'password_comparison_failed',
      NOT_EXIST: 'password_not_exist_in_your_user',
    },
    COMPANY: {
      STATUS: {
        REGISTER: 'already_company_with_this_document',
      },
    },
    USER_NOT_FOUND: 'user_not_found',
    TOKEN_EXPIRED: 'token_expired',
    NO_HAVE_TOKEN: 'not_have_token',
    INVALID_TOKEN: 'token_invalid',
    IN_USE: {
      EMAIL: 'email_already_in_use',
      PHONE: 'phone_already_in_use',
    },
    NOT_HAVE_PERMISSIONS: 'without_permission',
    SYSTEM: {
      DATABASE: 'Internal_error_database',
    },
  },
  SUCCESS: {
    USER: {
      DELETE: 'user_delete_with_sucess',
    },
    PASSWORD_UPDATE: 'password_update',
    COMPANY: {
      STATUS: {
        REGISTER: 'company_resgistred_with_sucess',
        UPDATED: 'company_updated_with_sucess',
      },
      SUCESS_MESSAGE: {
        REGISTER: 'received_request',
      },
    },
  },
} as const;
