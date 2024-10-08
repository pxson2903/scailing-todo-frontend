export const IS_SERVER = typeof window === 'undefined';
export const IS_BROWSER =
  typeof window !== 'undefined' && typeof window?.document !== 'undefined';
/* eslint-disable no-restricted-globals */
export const IS_WEBWORKER =
  typeof self === 'object' &&
  self.constructor &&
  self.constructor.name === 'DedicatedWorkerGlobalScope';
/* eslint-enable no-restricted-globals */

export function envGet(
  name: string,
  isRequired = false,
  defaultValue: string | undefined = undefined
): string | undefined {
  let variable = process.env[name];
  if (typeof variable === 'undefined') {
    if (isRequired) {
      throw new Error(`Missing process.env.${name} variable`);
    }
    variable = defaultValue;
  }
  return variable;
}

export function envRequired(
  passProcessDotEnvDotValueNameHere: string | undefined
): string {
  if (typeof passProcessDotEnvDotValueNameHere === 'undefined') {
    throw new Error('Missing .env variable!');
  }
  return passProcessDotEnvDotValueNameHere;
}

export function getCurrentVersion(): string {
  return (
    process.env.npm_package_version ??
    process.env.NEXT_PUBLIC_VERSION ??
    'unknown'
  );
}

export function getCurrentEnvironment(): string {
  return process.env.NEXT_PUBLIC_ENV ?? process.env?.NODE_ENV ?? 'development';
}
