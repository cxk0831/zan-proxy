export interface IMockRecord {
  id: string;
  name: string;
  contentType: {
    type: string;
    key: string;
    languageType: string;
  };
}
