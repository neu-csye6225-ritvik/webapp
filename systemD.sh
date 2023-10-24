#!/bin/bash
echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Create a new user for systemd            |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"

# Create a non-admin user
sudo useradd -m webappuser
sudo groupadd webappgroup

# Add webappuser and admin to the webappgroup
sudo usermod -aG webappgroup webappuser
sudo usermod -aG webappgroup admin

# Set ownership and permissions for webappuser's home directory
sudo chown -R webappuser:webappgroup /home/webappuser
sudo chmod -R 750 /home/webappuser

# Set ownership and permissions for the app.js file in admin's directory
sudo chown webappuser:webappgroup /home/admin/webapp/server.js
sudo chmod 750 /home/admin/webapp/server.js

# Add webappuser to the systemd-journal group
sudo usermod -aG systemd-journal webappuser

# Set the .env file in admin's directory
sudo chmod 644 /home/admin/webapp/.env

# Create the log file and set ownership and permissions
sudo touch /var/log/webapp.log
sudo chown webappuser:webappgroup /var/log/webapp.log
sudo chmod 644 /var/log/webapp.log

echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Setup Systemd                            |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"

cd 
sudo systemctl start webapp
sudo systemctl status webapp
sudo systemctl enable webapp
