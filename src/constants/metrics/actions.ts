export type EventAction =
  | 'analytics-init'
  | 'app-init'
  | 'app-parsed'
  | 'app-dependencies'
  | 'app-finished'
  | 'sw-init'
  | 'sw-finished';

export const ANALTYICS_INIT: EventAction = 'analytics-init';

export const APP_INIT: EventAction = 'app-init';
export const APP_PARSED: EventAction = 'app-parsed';
export const APP_DEPENDENCIES: EventAction = 'app-dependencies';
export const APP_FINISHED: EventAction = 'app-finished';

export const SW_INIT: EventAction = 'sw-init';
export const SW_FINISHED: EventAction = 'sw-finished';
