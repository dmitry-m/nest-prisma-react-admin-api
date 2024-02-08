import { User } from "src/user/user.entity";

export type TypeRole = "admin" | "user" | undefined;

// export interface AuthInterface {
//   user: User;
//   tokens: {
//     refreshToken: string;
//     accessToken: string;
//   };
// }

export interface AuthInterface extends User {
  accessToken: string;
}
