declare var API_PREFIX: string;
declare var GRAPHQL_API_PREFIX: string;
declare namespace NodeJS {
  interface Global {
    API_PREFIX: string;
    GRAPHQL_API_PREFIX: string;
  }
}