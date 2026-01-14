export type ApiErrorType = 'network' | 'server' | 'unknown'

export function handleResponseError(status: number): never {
  if(status >= 500) {
    throw new ApiError('server', 'Internal server error. Please try again later')
  } else {
    throw new ApiError('unknown', 'Unknown error');
  }
}

export class ApiError extends Error {
  type: ApiErrorType;
  constructor(type: ApiErrorType, message: string) {
    super(message);
    this.type = type;
    this.name = 'ApiError'
  }
}
