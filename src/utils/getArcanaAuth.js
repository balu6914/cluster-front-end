import { AuthProvider } from "@arcana/auth";

//Dashboard arc4n4-docx app
//Testnet: xar_test_87f34a9c7879cd4b726ba36a99e164837d70143a
// WA: 0xea8887Ad419058b9b844430F3Dc01e89Ca90d786
//Mainnet: xar_live_d7c88d9b033d100e4200d21a5c4897b896e60063
// WA: 0xbd1127C076c91274B9Ccd6c506817D364bc7ff80
 
let auth = null;

export const getAuthProvider = () => {
  if (!auth) {
    auth = new AuthProvider(
      "xar_live_d7c88d9b033d100e4200d21a5c4897b896e60063",
      {
        theme: "dark",
        alwaysVisible: true,     
        connectOptions: {
          compact: false
        }
      }
    );
  }
  return auth;
};
