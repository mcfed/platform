/// <reference types="react-scripts" />

declare var API_PREFIX: string;
declare namespace NodeJS {
  interface Global {
    API_PREFIX: string;
  }
}
