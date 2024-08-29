class AppError implements Error {
  public name: string;

  public status: number;

  public message: string;

  public stack: string;

  public errors: AppError[] = [];

  public params?: Record<
    string,
    string | number | AppError | undefined | Error[]
  >;

  constructor(message: string) {
    this.name = 'AppError';
    this.status = 500;
    this.message = message;
  }
}

export default AppError;
