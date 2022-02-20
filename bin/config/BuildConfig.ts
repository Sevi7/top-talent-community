export interface BuildConfig {
  readonly Environment: string;
  readonly Parameters: {
    JWT_TOKEN_KEY: string;
  };
}
