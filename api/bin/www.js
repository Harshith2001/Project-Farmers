#!/usr/bin/env node

import app from "../app.js";

const port = process.env.PORT || 3100;
export const API_LOCAL_URL_ADDR = `http://localhost:${port}`;

app.listen(port, () => console.log(`Listening at URL: ${API_LOCAL_URL_ADDR}`));
