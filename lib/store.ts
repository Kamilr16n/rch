'use client';

/*
 * Copyright 2020-present columns.ai
 *
 * The code belongs to https://columns.ai
 * Terms & conditions to be found at `LICENSE.txt`.
 */

declare global {
  interface Window {
    user_auth: any;
  }
}

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { gzip as c, ungzip as d } from 'pako';

export const IS_DEV = window.location.hostname == 'localhost';

// TODO: use official log provider
const log = (m: string) => IS_DEV ? console.log(m) : () => { };
export class Log {
  static info = (message: string) => {
    log(`[INFO] ${message}`);
  };

  static warn = (message: string) => {
    log(`[WARN] ${message}`);
  };

  static error = (message: string) => {
    log(`[ERROR] ${message}`);
  };

  static fatal = (message: string) => {
    log(`[FATAL] ${message}`);
    throw message;
  };
}

// provide compress and decompress functions using gzip algorithm
export class GzipCompression {
  public compress(text: string): string {
    if (!text) {
      return '';
    }

    return Buffer.from(c(text)).toString('base64');
  }
  public decompress(text: string): string {
    if (!text) {
      return '';
    }

    return d(Buffer.from(text, 'base64'), { to: 'string' });
  }
};

export const gzip = new GzipCompression();

// getter and setter of item stored in session storage
const storeItem = (key: string, obj: any = undefined, store: 'local' | 'session') => {
  // due to browser privacy settings (eg. Safari/Privacy block all cookes)
  // access localStorage may fail
  let storage = null;
  try {
    storage = (store == 'local') ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }

  // versioned key
  const vKey = key + '_1';
  // special value of null means delete the item
  if (obj === null) {
    storage.removeItem(key);
    return null;
  }

  try {
    if (obj) {
      // setItem will fail if obj is not string
      storage.setItem(vKey, gzip.compress(JSON.stringify(obj)));
      return obj;
    }

    return JSON.parse(gzip.decompress(storage.getItem(vKey) || ''));
  } catch (e) {
    storage.removeItem(vKey);
    Log.error(`Failed to parse data from local store: ${key}`);

    // return object itself if passed in for saving
    // otherwise return null as we can not get anything
    return obj || null;
  }
};

// getter and setter of item stored in session storage
export const sessionItem = (key: string, obj: any = undefined) => {
  return storeItem(key, obj, 'session');
};

// getter and setter of item stored in session storage
export const localItem = (key: string, obj: any = undefined) => {
  return storeItem(key, obj, 'local');
};

// client user auth lib
const config = {
  apiKey: "AIzaSyBsdqSyU6ovcc5hwkvVcKUmxZo5MSJo684",
  authDomain: "rechart-4b2b9.firebaseapp.com",
  projectId: "rechart-4b2b9",
  storageBucket: "rechart-4b2b9.firebasestorage.app",
  messagingSenderId: "1013376000341",
  appId: "1:1013376000341:web:360ea935a005f280accfdc",
  measurementId: "G-HWGPQKZ311"
};

export const auth = () => {
  let inst = window.user_auth;
  if (!inst) {
    inst = getAuth(initializeApp(config));
    window.user_auth = inst;
  }

  return inst;
};
