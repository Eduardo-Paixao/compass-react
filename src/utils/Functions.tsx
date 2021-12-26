import { toastError } from "../components/Toasts";
import { apiUsers } from "../services/api";
import { IRepos } from "./Interfaces";

export const getRepoUser = async (
  user: string | undefined,
  setRepos: (value: React.SetStateAction<IRepos[]>) => void,
  setIsLoading: (value: React.SetStateAction<boolean>) => void
) => {
  try {
    setIsLoading(true);
    const { data } = await apiUsers.get(`${user}/repos`);
    setRepos(data);
  } catch (error: any) {
    setIsLoading(false);
    toastError(error?.response?.data.message);
  } finally {
    setIsLoading(false);
  }
};

export const getStarredUser = async (
  user: string | undefined,
  setRepos: (value: React.SetStateAction<IRepos[]>) => void,
  setIsLoading: (value: React.SetStateAction<boolean>) => void
) => {
  try {
    setIsLoading(true);
    const { data } = await apiUsers.get(`${user}/starred`);
    setRepos(data);
  } catch (error: any) {
    setIsLoading(false);
    toastError(error?.response?.data.message);
  } finally {
    setIsLoading(false);
  }
};
