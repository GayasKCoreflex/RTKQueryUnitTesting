# TodoList Test Suite with MSW, Redux, and React Navigation

This project demonstrates a test setup for a React Native `TodoList` screen using:

- **@testing-library/react-native**
- **Redux Toolkit** (with slice + RTK Query)
- **MSW** (Mock Service Worker) to intercept network requests
- **React Navigation**
- **Jest** for running the test suite

---

## Test File Structure

- **Component Under Test**: `TodoList.tsx`
- **Store Slices**:
  - `todosSlice.ts` (regular Redux slice)
  - `todoApiRTKSlice.ts` (RTK Query slice)
- **MSW Setup**: `server.ts` under `src/mocks/`

---

## Tests Overview

### Test 1: Renders Todos from API

- Verifies the `ActivityIndicator` appears during loading
- Waits for the mock todos (`Learn MSW`, `Write Tests`) to appear
- Uses `waitFor` to ensure the async API call resolves

### Test 2: Displays Error on API Failure

- Overrides the MSW handler to return a 500 error
- Verifies the loading indicator shows first
- Then checks that an error message (`something went wrong`) is displayed
- Confirms that the original todos are **not** shown

---
