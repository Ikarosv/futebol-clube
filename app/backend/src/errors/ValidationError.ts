export default class ValidationError extends Error {
  name = 'ValidationError';
  constructor(message: string, public status: number = 400) {
    super(message);
  }
}
