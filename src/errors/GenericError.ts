export class GenericError extends Error {
    public status: number;
  
    constructor(name: string, status: number, message: string) {
      super(message);
      this.status = status;
      this.name = name;
    }
  }