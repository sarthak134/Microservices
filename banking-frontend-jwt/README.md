# Northstar Banking Frontend

React + Vite + TypeScript frontend using Bootstrap 5 and Bootstrap Icons.

## Included screens
- Login page and protected routes (`/dashboard`, `/customers`, `/accounts`)
- Dashboard with live customer/account counts and combined balance
- Customer list, search, and create-customer form
- Account list, search, and create-account form
- Responsive navy/soft-blue banking UI

## Run it
1. Install Node.js 20 or newer.
2. Open a terminal in this folder.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed by Vite.

Demo login: the fields are pre-filled. In demo mode, any non-empty email and password are accepted. This is **not production authentication**; replace it with your real login API before deployment.

## Backend URLs
Defaults:
- Customer service: `http://localhost:8081/api/v1/customers`
- Account service: `http://localhost:8082/api/v1/accounts`

You can override these by copying `.env.example` to `.env` and changing the values. Restart Vite after editing environment variables.

## Important backend checks
- Both services must be running and reachable from the browser.
- Configure CORS in both Spring Boot services to allow your Vite origin (usually `http://localhost:5173`).
- The customer create endpoint expects your `CustomerRequest` DTO fields. This form sends `name`, `email`, `mobile`, `dateOfBirth`, `gender`, and `city`; adjust `src/services/api.ts` or the form if your DTO uses different names.
- Account create endpoint is assumed to accept `customerId`, `openingDate`, `balance`, and `accountType` as shown in your `Account` entity.
- Login is currently UI-only demo login; your shown backend does not include an authentication endpoint.

## Connect the authentication service

The frontend expects these endpoints by default:

- `POST http://localhost:9898/auth/register` with `{ "name": "Your Name", "email": "you@example.com", "password": "your-password" }`
- `POST http://localhost:9898/auth/token` with `{ "username": "Your Name", "password": "your-password" }`

The login payload uses `username` because your `AuthRequest` controller expects `getUsername()`. This example assumes your auth service looks up users using `UserCredential.name`; if your `UserDetailsService` uses email instead, change the login input/submit mapping to send the email as `username`.

Create a local `.env` from `.env.example` if you need to change service URLs, then restart Vite after editing environment variables. Configure CORS in the authentication service to allow `http://localhost:5173`, and configure CORS on customer and account services as well. If Spring Security protects the APIs, enable CORS in each relevant `SecurityFilterChain` too.

The JWT is held in `sessionStorage` for the browser session and attached as `Authorization: Bearer <token>` to customer and account API calls. For a production banking application, consider a backend-managed secure, HttpOnly cookie or another reviewed token-storage approach, HTTPS, token expiry/refresh handling, and server-side authorization on every protected endpoint.
