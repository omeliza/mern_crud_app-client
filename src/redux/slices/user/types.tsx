export type UserOutput = {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type UserInput = {
  email: string;
  first_name: string;
  last_name: string;
};

export type UsersState = {
  list: UserOutput[];
  loading: boolean;
  error: string | null;
};
