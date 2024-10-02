declare global {
  interface Job {
    id: string;
    createdAt: Date;
    user: string;
    title: string;
    location: string;
    estimatedJobTime: string;
    description: string;
    requirements?: array;
  }
}
export {};
