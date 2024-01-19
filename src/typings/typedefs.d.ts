export type GTMConstructor = {
  tagId: string;
  dataLayerName?: string;
  environment?: GTMEnvironment;
  domain?: string;
  script?: string;
  nonce?: string;
};

export type GTMEnvironment = {
  gtm_auth: string;
  gtm_preview: string;
};
