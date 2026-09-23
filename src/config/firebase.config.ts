import {
  App,
  initializeApp,
  getApps,
  applicationDefault,
  cert,
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { ConfigService } from '@nestjs/config';

let firebaseApp: App | null = null;

/**
 * Initialises Firebase Admin SDK lazily (singleton).
 *
 * For local development without a service-account JSON file, set
 * GOOGLE_APPLICATION_CREDENTIALS env var to the path of your service-account
 * JSON, or provide FIREBASE_SERVICE_ACCOUNT_PATH in .env.
 *
 * For production (Cloud Run / GKE), applicationDefault() uses the
 * attached service account automatically.
 */
export function initFirebase(configService: ConfigService): App {
  if (firebaseApp) return firebaseApp;

  // If Firebase is already initialised (e.g. hot reload), reuse the existing app
  const existingApps = getApps();
  if (existingApps.length > 0) {
    firebaseApp = existingApps[0];
    return firebaseApp;
  }

  const projectId = configService.get<string>('FIREBASE_PROJECT_ID');
  const serviceAccountPath = configService.get<string>('FIREBASE_SERVICE_ACCOUNT_PATH');

  let credential;

  if (serviceAccountPath) {
    // Full service-account credentials (recommended for production)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const serviceAccount = require(serviceAccountPath);
    credential = cert(serviceAccount);
  } else {
    // Uses GOOGLE_APPLICATION_CREDENTIALS env var or attached service account
    credential = applicationDefault();
  }

  firebaseApp = initializeApp({ credential, projectId });
  return firebaseApp;
}

export function getFirebaseApp(): App {
  if (!firebaseApp) {
    const existingApps = getApps();
    if (existingApps.length > 0) {
      firebaseApp = existingApps[0];
      return firebaseApp;
    }
    throw new Error(
      'Firebase Admin not initialised. Call initFirebase() first.',
    );
  }
  return firebaseApp;
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}
