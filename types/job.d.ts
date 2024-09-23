declare global {
  interface Job {
    id: string;
    user: string;
    title: string;
    location: string;
    estimatedJobTime: string;
    description: string;
    requirements?: array;
  }
}
export {};
