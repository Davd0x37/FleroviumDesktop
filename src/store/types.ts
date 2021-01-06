export interface Stash {
  name: string;
  logoIcon: string;
  importantColor: string;
  enabled: boolean;
  globalScript: boolean;
  data: StashData[];
  selectedData: Record<string, StashData[]>;
  authCodes: Record<string, string>;
  // paths: Record<string, string>;
  script: Record<string, any>;
  vars: Vars;
}

export interface Vars {
  client_id?: string;
  client_secret?: string;
  authorize_uri?: string;
  redirect_uri?: string;
  token_endpoint_uri?: string;
  data_paths: Record<string, any>;
  scope?: string;
}

export interface StashData {
  label: string; // Title
  detail: string; // Path
  important: boolean; // Is important?
  enabled: boolean;
  matchers?: Record<string, any>;
  collect?: boolean; // Collect array from objects
  limit?: number; // Collected array limit
}

export interface Store {
  vaultName: string;
  password: string;
  search: string;
  miniVariant: boolean;
  snackbarContent: string;
  snackbarColor: string;
  dark: boolean;
  initialized: boolean;
  stashes: Stash[];
  globalScript: Record<string, any>;
}
