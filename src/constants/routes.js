/**
 * Application Routes
 * 
 * Centralized route definitions to avoid hardcoded URLs throughout the app.
 * Makes it easier to refactor routes and maintain consistency.
 */

export const ROUTES = {
  START: '/',
  GAME: (playerId) => `/game/${playerId}`,
  SCORES: (playerId) => `/scores/${playerId}`,
};

/**
 * Route paths for React Router configuration
 * These are the patterns used in <Route path="..." />
 */
export const ROUTE_PATHS = {
  START: '/',
  GAME: '/game/:playerId',
  SCORES: '/scores/:playerId',
  FALLBACK: '*',
};
