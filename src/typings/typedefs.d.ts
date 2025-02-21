export type GTMConstructor = {
  tagId: string;
  dataLayerName?: string;
  environment?: GTMEnvironment;
  domain?: string;
  script?: string;
  nonce?: string;
  devMode?: boolean;
};

export type GTMEnvironment = {
  gtm_auth: string;
  gtm_preview: string;
};
