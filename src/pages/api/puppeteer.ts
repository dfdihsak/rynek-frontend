// src/pages/api/puppeteer.ts

import fs from 'fs';
import validURL from 'valid-url';
import { NextApiRequest, NextApiResponse } from 'next';
// Puppeteer extra is a wrapper around puppeteer,
import puppeteer from 'puppeteer-extra';

const POSHMARK_EMAIL: string = 'luckydaisiespress@gmail.com';
const POSHMARK_PASSWORD: string = 'luckylucky1';
// Load item details from item.json
const item = {
    "title": "purple skirt",
    "description": "worn once ships from boston",
    "originalPrice": "20",
    "listingPrice": "10",
    "sizeSelector": "0",
    "imagePath": "/Users/angelasu/Desktop/rynek-backend/images/purpleskirt.png",
    "categorySelector": "Women",
    "subcategorySelector": "Skirts"
};

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
    const browser = await puppeteer.launch({ headless: false }); // Launch browser in non-headless mode
        const page = await browser.newPage();

        // Rotate User-Agent
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        ];
        const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
        await page.setUserAgent(randomUserAgent);

        await page.goto('https://poshmark.com/login');

        // Enter login credentials
        await page.type('#login_form_username_email', POSHMARK_EMAIL);
        await delay(1000 + Math.floor(Math.random() * 2000)); // Random delay
        await page.type('#login_form_password', POSHMARK_PASSWORD);
        await delay(1000 + Math.floor(Math.random() * 2000)); // Random delay

        // Click the login button
        await page.click('button[type="submit"]');

        // Wait for navigation to complete
        await page.waitForNavigation();
        await delay(2000 + Math.floor(Math.random() * 3000)); // Random delay

        console.log('login ok');
    } catch (error) {
        console.error('Error:', error);
    }
}