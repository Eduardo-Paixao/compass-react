export interface IRepos {
  id: number;
  name: string;
  stargazers_count: number;
  created_at: string;
}

export interface IParamsName {
  name: string;
}

export interface ISearchUser {
  name: string;
  followers: number;
  following: number;
  html_url: string;
  public_repos: number;
  avatar_url: string;
}