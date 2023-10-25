#!/bin/bash
echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    setup new user permissions               |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"

echo "get the home directory of user"
echo ~webappuser
# sudo -u webappuser bash
echo "display permissions of user directory"
ls -la /opt/webappuser

echo "change permissions of webapp"
sudo chown -R webappuser:webappgroup /opt/webappuser/webapp
sudo chmod -R 750  /opt/webappuser/webapp

echo "display permissions of user directory"
ls -la /opt/webappuser

# sudo -u webappuser bash
# cd webapp


# Create a non-admin user
# sudo useradd -m webappuser
# sudo groupadd webappgroup

# sudo groupadd webappgroup
# sudo useradd -s /bin/false -g webappgroup -d /opt/webappuser -m webappuser

# # Add webappuser and admin to the webappgroup
# sudo usermod -aG webappgroup webappuser
# sudo usermod -aG webappgroup admin

# # Set ownership and permissions for webappuser's home directory
# sudo chown -R webappuser:webappgroup /home/webappuser
# sudo chmod -R 750 /home/webappuser

# # Set ownership and permissions for the app.js file in admin's directory
# sudo chown webappuser:webappgroup /opt/webapp/server.js
# sudo chmod 750 /opt/webapp/server.js

# # Add webappuser to the systemd-journal group
# sudo usermod -aG systemd-journal webappuser

# # Set the .env file in admin's directory
# sudo chmod 644 /opt/webapp/.env

# # Create the log file and set ownership and permissions
# sudo touch /var/log/webapp.log
# sudo chown webappuser:webappgroup /var/log/webapp.log
# sudo chmod 644 /var/log/webapp.log

echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Setup Systemd                            |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"

cd 
sudo systemctl start webapp
sudo systemctl restart webapp
sudo systemctl status webapp
sudo systemctl enable webapp

