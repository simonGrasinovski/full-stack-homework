import '@testing-library/jest-dom';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock Request and Response for Node.js environment
global.Request = class Request {
  constructor(public url: string, public options: any = {}) {
    this.method = options.method || 'GET';
    this.headers = new Headers(options.headers || {});
    this.body = options.body;
  }
  public method: string;
  public headers: Headers;
  public body?: any;
  
  async json() {
    if (this.body) {
      return JSON.parse(this.body);
    }
    return {};
  }
};

global.Response = class Response {
  constructor(public body: any, public options: any = {}) {
    this.status = options.status || 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.headers = new Headers(options.headers || {});
  }
  public status: number;
  public ok: boolean;
  public headers: Headers;
  
  async json() {
    return JSON.parse(this.body);
  }
};

global.Headers = class Headers {
  private _headers: Record<string, string> = {};
  
  constructor(headers: Record<string, string> = {}) {
    this._headers = { ...headers };
  }
  
  get(name: string) {
    return this._headers[name.toLowerCase()];
  }
  
  set(name: string, value: string) {
    this._headers[name.toLowerCase()] = value;
  }
  
  has(name: string) {
    return name.toLowerCase() in this._headers;
  }
};