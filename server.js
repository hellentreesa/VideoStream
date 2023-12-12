// server.js
const path = require('path');

const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=videostream2;AccountKey=zUp2JBhac8Amy7BTwOpL3+Jdyc4WCNY5AzH1F1tEFR5ZWjdqRnKI85gTYutJPA5KMt2YovRF1/Z9+AStqud9ig==;EndpointSuffix=core.windows.net';
const containerName = 'videocontainer';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

app.use(express.static('public'));

app.post('/register', (req, res) => {
  // Handle user registration (simplified example)
  // Save user data to a database or another storage (not implemented)
  res.send('User registered successfully.');
});



app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const { originalname } = req.file;
    const blobClient = containerClient.getBlockBlobClient(originalname);
    await blobClient.uploadFile(req.file.path);

    // Store video details in a database or data store
    const videoDetails = {
      name: originalname,
      url: blobClient.url // Save the video URL
    };
    // Assume you have a database (e.g., MongoDB) to store video details
    // Insert the videoDetails into your database (not implemented here)

    res.send('Video uploaded successfully.');
  } catch (error) {
    console.error('Error during video upload:', error);
    res.status(500).send('Internal Server Error');
  }
});









const keyVault = require('./keyVault');



// Example route using Azure Key Vault
app.get('/', async (req, res) => {
  try {
    const username = await keyVault.getSecret('your-username-secret-name');
    const password = await keyVault.getSecret('your-password-secret-name');

    // Use username and password as needed
    res.send(`Username: ${username}, Password: ${password}`);
  } catch (error) {
    console.error('Error retrieving secrets:', error);
    res.status(500).send('Internal Server Error');
  }
});




 app.get("/video", async (req, res) => {
    
        try {
            // Create the BlobServiceClient object which will be used to create a container client
            const blobServiceClient = BlobServiceClient.fromConnectionString(
                AZURE_STORAGE_CONNECTION_STRING
            );
    
            const containerName = 'videos';
            const blobName = req.query.path;
    
            // Get a reference to a container
            const containerClient = blobServiceClient.getContainerClient(containerName);
    
            // Get a block blob client
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
            console.log('\nDownloaded blob content...');
    
            const downloadBlockBlobResponse = await blockBlobClient.download(0);
    
            downloadBlockBlobResponse.readableStreamBody.pipe(res);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    
    });











app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});








