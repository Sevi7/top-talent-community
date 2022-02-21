export interface BuildConfig {
  readonly Environment: string;
  readonly Parameters: {
    JWT_TOKEN_KEY: string;
    DYNAMO_TABLE_NAME_MEMBERS: string;
    DYNAMO_TABLE_NAME_NOMINATIONS: string;
    SOURCE_EMAIL: string;
  };
}
