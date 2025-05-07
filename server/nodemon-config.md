# nodemon.json explanation

    // Watch the current directory (i.e., everything inside 'server')
    "watch": ["."],

    // Ignore the 'node_modules' folder to avoid unnecessary file watching
    // It contains thousands of files we never manually change, so watching it wastes memory and CPU
    "ignore": ["node_modules"],

    // Only restart the server when files with these extensions change
    // 'js' = JavaScript files
    // 'json' = config or data files
    // This avoids unnecessary restarts on irrelevant files (e.g., images, README.md, etc.)
    "ext": "js,json"


### 🔍 What is "ext" exactly?
-   It's short for “extensions.”
-   Nodemon uses it to decide which file types should trigger a server restart.
-   If you don't include it, Nodemon watches all file types, which can be inefficient.

