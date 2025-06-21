/*
 * Copyright 2020-present columns.ai
 *
 * The code belongs to https://columns.ai
 * Terms & conditions to be found at `LICENSE.txt`.
 */

import { useEffect } from 'react';
import {
  getAdditionalUserInfo,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';
import { auth, localItem, Log } from '../../lib/store';

const actionCodeSettings = {
  url: 'https://rechart.app/signup?userId=1234',
  // This must be true.
  handleCodeInApp: true,
  // The domain must be configured in Firebase Hosting and owned by the project.
  linkDomain: 'rechart.app',
};

// the email attempts to sign in
const AttemptEmail = 'Email2SignIn';

const sendEmail = async (email: string): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    sendSignInLinkToEmail(auth(), email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        localItem(AttemptEmail, email);
        resolve(true);
      })
      .catch((error) => {
        Log.error('Failed to send sign in email: ' + error);
        resolve(false);
      });
  });
};

// React hook that responsible to sign in a user.
export const useAuth = () => {
  useEffect(() => {
    const link = window.location.href;
    if (isSignInWithEmailLink(auth(), link)) {
      const email = localItem(AttemptEmail);
      if (email) {
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth(), email, link)
          .then((result) => {
            // Clear email from storage.
            localItem(AttemptEmail, null);

            // TODO: load user profile and other info
            const profile = getAdditionalUserInfo(result)?.profile;
            Log.info(`DBG: profile=${JSON.stringify(profile)}`);

            // TODO: we need a global store to manage user state
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      }
    }
  }, []);

  return {
    send: sendEmail,
  };
};
