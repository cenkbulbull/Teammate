declare global {
  interface DropzoneOptions {
    acceptedFiles: string;
    maxFiles: number;
    dictDefaultMessage: string;
    url: string;
    init?: () => void;
  }
}
export {};
