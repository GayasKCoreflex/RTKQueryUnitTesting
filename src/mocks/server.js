import { setupServer } from 'msw/native';
import { handlers } from './handlers';

export const server = setupServer(...handlers);


// This creates a mock server instance using MSW's setupServer function.
// It imports your handlers which define mock responses and spreads them into the server setup.
// This server will intercept all matching HTTP requests during tests.

