export type ApiErrorType = 'network' | 'server' | 'unknown'

export class ApiError extends Error {
  type: ApiErrorType;
  constructor(type: ApiErrorType, message: string) {
    super(message);
    this.type = type;
    this.name = 'ApiError'
  }
}
