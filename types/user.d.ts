declare global {
  interface User {
    id: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    biography?: string;
    job?: string;
    telephone?: string;
    resume?: string;
    profilePhoto?: string;
    social?: SocialLinks;
    abilities?: string[];
    jobs?: number[];
    applied?: number[]; // Sadece postId değerlerini içermeli
    favorites?: number[];
    emailNotification?: boolean;
  }
}
export {};
