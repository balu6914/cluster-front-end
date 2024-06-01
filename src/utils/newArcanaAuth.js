//  *@ CLUSTER PROTOCOL - GPU MARKETPLACE
//  *GNU General Public License v3.0
//  *Copyright (C) 2024 



import { AuthProvider } from "@arcana/auth";

let auth = null;

export const getAuthProvider = () => {
  if (!auth) {
    auth = new AuthProvider(
      "xar_test_c3e28abd51350b9cc2a24da331222c1b158a5473",
      {
        connectOptions: {
          compact: false
        }
      }
    );
  }
  return auth;
};
