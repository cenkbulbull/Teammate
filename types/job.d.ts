declare global {
  interface Job {
    user: string;
    title: string;
    location: string;
    estimatedJobTime: string;
    description: string;
    requirements?: array;
  }
}
export {};
