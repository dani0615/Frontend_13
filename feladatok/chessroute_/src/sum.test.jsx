import {describe, test, expect} from "bun:test"
import { sum } from './sum.jsx'
describe('Sum komponens', ()=>{
    test(' Adjuk össze az 1+2-t, ami 3', ()=>{
        expect(sum(1,2)).toBe(3);
    });
});