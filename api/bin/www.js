#!/usr/bin/env node

import app from "../app.js";

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening on port ${port}`));
