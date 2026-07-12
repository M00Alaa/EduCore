// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,
  api: 'http://vult.api.localhost',
  // api: 'http://betaapi.govult.com',

  firebase: {
    apiKey: "AIzaSyC9uzf-5wJYK1cq4pi10YP73tAijFM2tYc",
    authDomain: "mawhoob-28a9f.firebaseapp.com",
    projectId: "mawhoob-28a9f",
    storageBucket: "mawhoob-28a9f.firebasestorage.app",
    messagingSenderId: "267529043097",
    appId: "1:267529043097:web:d6f96643b62f4066f08c08",
    measurementId: "G-XWQL55FVNK"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.

