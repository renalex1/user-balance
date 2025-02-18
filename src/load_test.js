import { check, sleep } from 'k6';
import http from 'k6/http';

export let options = {
    vus: 10,  
    duration: '30s',  
    iterations: 10000,  
};

const API_URL = 'http://127.0.0.1:4000/users/update-balance';
const USER_ID = 1;

export default function () {
    const payload = JSON.stringify({
        userId: USER_ID,
        amount: -2,
    });

    const res = http.post(API_URL, payload, {
        headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
        '✅ response is 200 or 400': (r) => r.status === 200 || r.status === 400,
        '✅ successful withdrawal or insufficient funds': (r) => 
            (r.status === 200 && r.json().balance !== undefined) ||
            (r.status === 400 && r.json().message === 'Insufficient funds or concurrency issue'),
    });

    sleep(0.01);
}
