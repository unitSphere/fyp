# BioBuy

# Run App on Dev

0. Install dependencies by `npm install` (Both in /client and /server directories)
1. `node app.js` keep this running (execute in /server)
2. `cd ./client`
3. `npm start` keep this running

# Build and Deploy in AWS
If you already have run the project once in your EC2 machine and want to redeploy then execute the following commands in your EC2 Machine:

1. `cd /var/www/fyp`
2. `sudo pm2 start fyp.config.js`
3. `cd client`
4. `sudo npm run build`
5. `pm2 serve ./build 3000 --name "my-react" --spa`
6. Go to the Public IP address of EC2 Server (Can be found in EC2 Console Dashboard) and get the address (USE HTTP not HTTPS)
7. Access the backend at port 8082 and frontend at port 3000. (example: http://18.163.80.229:3000/)
