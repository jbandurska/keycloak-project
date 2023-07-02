First, we need to install the dependencies for the application and API. We can do this by running the install.sh script or by doing it manually.

We can start the application using the start.sh script. The script will run in the background and wait for a shutdown signal (Ctrl+C) to properly terminate all running applications.

If the script fails to start the application for some reason, we can start them manually. We need to run api1 (node api_1/server.js), api2 (node api_2/server.js), the React frontend (cd frontend && npm start), and the Keycloak container (docker-compose -f konteneryzacja/docker-compose.yaml up).

To test the application, we have two options:

    Log in as a regular user:
        Username: myuser
        Password: myuser
    Log in as an administrator:
        Username: myadmin
        Password: myadmin

The First Secured API returns a different response depending on the user's role. The Admin Page is only accessible to administrators.

To log in, click the "Login with Keycloak" button.
