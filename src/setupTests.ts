// // src/setupTests.js
import { server } from './mocks/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared as a part of our tests.
afterEach(() => server.resetHandlers());

// Clean up after all tests are done.
afterAll(() => server.close());

