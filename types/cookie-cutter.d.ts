declare module 'cookie-cutter' {
  interface CookieCutter {
    get(name: string): string | undefined;
    set(name: string, value: string, options?: {
      path?: string;
      expires?: Date;
      domain?: string;
      secure?: boolean;
    }): void;
  }

  const cookieCutter: CookieCutter;
  export default cookieCutter;
} 