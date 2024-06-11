// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/',
  firebaseConfig: {
    apiKey: "AIzaSyBLeqBA6ePzQNR_H-Ug92Qn1hmExCwHEl4",
    authDomain: "chatreportes-9e57a.firebaseapp.com",
    projectId: "chatreportes-9e57a",
    storageBucket: "chatreportes-9e57a.appspot.com",
    messagingSenderId: "331045414869",
    appId: "1:331045414869:web:a1361db768593fc3777f5c",
    measurementId: "G-C4V7Z65WFD"
  }
};
