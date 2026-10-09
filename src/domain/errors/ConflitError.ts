import { AppError } from './app-error';

export default class ConflitError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}
