import { HttpErrorResponse } from '@angular/common/http';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function apiErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof HttpErrorResponse) || !isRecord(error.error)) {
    return fallback;
  }

  const detail = error.error['detail'];
  if (typeof detail === 'string' && detail.trim()) {
    return detail;
  }

  const validationErrors = error.error['errors'];
  if (isRecord(validationErrors)) {
    const messages = Object.values(validationErrors)
      .flatMap(value => Array.isArray(value) ? value : [])
      .filter((value): value is string => typeof value === 'string');
    if (messages.length > 0) {
      return messages.join('\n');
    }
  }

  return fallback;
}
