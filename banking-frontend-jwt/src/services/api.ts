const GATEWAY_URL = "http://localhost:8765";

const AUTH_API = import.meta.env.VITE_AUTH_API_URL || `${GATEWAY_URL}/auth`;
const CUSTOMER_API =
  import.meta.env.VITE_CUSTOMER_API_URL || `${GATEWAY_URL}/api/v1/customers`;
const ACCOUNT_API =
  import.meta.env.VITE_ACCOUNT_API_URL || `${GATEWAY_URL}/api/v1/accounts`;

function authHeaders(): Record<string, string> {
  const token = sessionStorage.getItem("northstar-token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...init?.headers,
    },
  });
  const body = await response.text();
  if (!response.ok)
    throw new Error(body || `Request failed (${response.status})`);
  if (response.status === 204 || !body) return undefined as T;
  try {
    return JSON.parse(body) as T;
  } catch {
    return body as T;
  }
}

export type RegisterPayload = { name: string; email: string; password: string };
export type LoginPayload = { username: string; password: string };
export const authApi = {
  register: (payload: RegisterPayload) =>
    request<string>(`${AUTH_API}/register`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  login: (payload: LoginPayload) =>
    request<string>(`${AUTH_API}/token`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  validate: (token: string) =>
    request<string>(`${AUTH_API}/validate?token=${encodeURIComponent(token)}`),
};

export type Customer = {
  customerId?: number;
  name: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  gender: string;
  city: string;
};
export type Account = {
  accountno?: number;
  customerId: number;
  openingDate: string;
  balance: number;
  accountType: string;
};
export const customerApi = {
  getAll: () => request<Customer[]>(CUSTOMER_API),
  getById: (id: number) => request<Customer>(`${CUSTOMER_API}/${id}`),
  create: (customer: Customer) =>
    request<Customer>(CUSTOMER_API, {
      method: "POST",
      body: JSON.stringify(customer),
    }),
};
export const accountApi = {
  getAll: () => request<Account[]>(`${ACCOUNT_API}/savings`),
  create: (account: Account) =>
    request<Account>(`${ACCOUNT_API}/savings`, {
      method: "POST",
      body: JSON.stringify(account),
    }),
  getByCustomer: (id: number) =>
    request<Account[]>(`${ACCOUNT_API}/customers/${id}`),
};
