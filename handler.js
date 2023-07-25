const fs = require('fs');
const path = require('path');

const app = async (event, context) => {
    let filePath = event.path;

    // Remove leading slash
    if (filePath.startsWith('/')) {
        filePath = filePath.slice(1);
    }

    // Default to index.html if path is empty
    if (filePath === '') {
        filePath = 'index.html';
    }

    try {
        // Try to read the file from the file system
        const fileContent = fs.readFileSync(path.join('build', filePath));

        // Determine the content type
        const contentType = filePath === 'index.html' ? 'text/html; charset=utf-8' : getContentType(filePath);

        // Return the file content with the appropriate content type
        return {
            isBase64Encoded: true,
            statusCode: 200,
            headers: { 'Content-Type': contentType },
            body: Buffer.from(fileContent).toString('base64'),
        };
    } catch (e) {
        // If the file could not be read, return a 404 error
        return {
            statusCode: 404,
            body: 'Not found',
            headers: {
                'Content-Type': 'text/html; charset=utf-8'
            },
        };
    }
};

function getContentType(filePath) {
    if (filePath.endsWith('.html')) return 'text/html';
    if (filePath.endsWith('.js')) return 'application/javascript';
    if (filePath.endsWith('.css')) return 'text/css';
    if (filePath.endsWith('.png')) return 'image/png';
    if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg';
    // Add more content types as needed
    return 'text/plain';
}

module.exports = { app };
