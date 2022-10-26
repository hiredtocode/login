// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

export const baseUrl: string =
  'http://ec2-3-37-207-126.ap-northeast-2.compute.amazonaws.com:9999/api/users/';
export const postUrl: string =
  'http://ec2-3-37-207-126.ap-northeast-2.compute.amazonaws.com:9999/api/';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD7NzO4DsEjRh_PULTtYD2hWjosXU4K-bc',
  authDomain: 'palpals.firebaseapp.com',
  projectId: 'palpals',
  storageBucket: 'palpals.appspot.com',
  messagingSenderId: '485543432117',
  appId: '1:485543432117:web:faf7d8cf477a66401053fc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
