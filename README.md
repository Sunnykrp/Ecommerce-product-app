# 🛒 E-commerce Product App

A simple e-commerce app I built using Next.js and Redux. You can browse products, add them to cart, and manage everything through a basic admin dashboard.

## What it does

This is basically an online store where you can:
- Look at products (fetched from a fake store API)
- Search for stuff you want
- Add things to your cart
- See product details
- Manage your cart (add more, remove items)
- Check out a dashboard with some stats

The cart remembers what you added even if you refresh the page.

## Built with

- Next.js - for the web app
- Redux - to manage all the data
- TailwindCSS - to make it look decent
- FakeStore API - for dummy product data

## How to run it

Just clone this repo and:

```bash
npm install
npm run dev
```

Then go to `http://localhost:3000` and you should see it working.

## What's inside

```
src/
├── components/     # Reusable stuff like navbar, product cards
├── pages/         # All the different pages
├── redux/         # Where I handle all the state management
├── styles/        # CSS files
└── utils/         # Helper functions for API calls
```

## Pages

**Home** - Shows all products in a grid, has a search bar
**Product page** - Click on any product to see more details
**Cart** - See what you've added, change quantities, remove stuff
**Dashboard** - Simple admin view with some numbers and a product table

## Features I added

- Search works by filtering the products you already loaded (not hitting the API again)
- Cart badge in the navbar shows how many items you have
- Added +/- buttons to make changing quantities easier
- Dashboard shows total products, items in cart, and total value
- Everything is responsive so it works on mobile too





