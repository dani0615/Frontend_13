import { JSDOM } from 'jsdom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'bun:test';

const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
});

globalThis.window = jsdom.window;
globalThis.document = jsdom.window.document;
globalThis.navigator = jsdom.window.navigator;
globalThis.location = jsdom.window.location;
globalThis.Node = jsdom.window.Node;

expect.extend(matchers);
