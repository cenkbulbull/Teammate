declare global {
  interface User {
    id: string;
    email: string;
    password: string;
    authMethod: string;
    firstname: string;
    lastname: string;
    biography?: string;
    job?: string;
    telephone?: string;
    resume?: string;
    profilePhoto?: string;
    social?: SocialLinks;
    abilities?: string[];
    jobs?: string[];
    applied?: string[]; // Sadece postId değerlerini içermeli
    favorites?: string[];
    emailNotification?: boolean;
  }
}
export {};
