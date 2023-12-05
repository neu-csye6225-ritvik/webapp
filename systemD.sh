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

