#!/bin/bash
echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Install NodeJS and NPM                   |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
echo "sudo apt update"
sudo apt update 




echo "Node and npm"
sudo apt install nodejs npm -y

# echo "+-------------------------------------------------------------+"
# echo "|                                                             |"
# echo "|                    Install POSTGRESQL                       |"   
# echo "|                                                             |"
# echo "+-------------------------------------------------------------+"

echo "sudo apt update"
sudo apt update


# echo "sudo apt install postgresql postgresql-contrib"
# sudo apt install postgresql postgresql-contrib -y

# echo "sudo systemctl start postgresql.service"
# sudo systemctl start postgresql.service


# echo "sudo -i -u postgres"
# sudo -i -u postgres

# echo "alter postgres user password"
# sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"

# echo "Grant all privileges to postgres user"
# sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;"

# echo "Grant schema public to postgres"
# sudo -u postgres psql -c "GRANT ALL ON SCHEMA public TO postgres;"

echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Setup webappuser                         |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
sudo groupadd webappgroup
sudo useradd -s /bin/false -g webappgroup -d /opt/webappuser -m webappuser


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    UNZIP WEBAPP                             |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
sudo apt update
sudo apt install unzip

echo "check webapp in home directory"
ls
echo "cp webapp to user home directory"
sudo cp -r  webapp.zip /opt/webappuser
cd /opt/webappuser
echo "unzip in opt/webappuser"
sudo unzip webapp.zip

echo "----Checking if the file exists----"
ls 


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Install Node Modules                     |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
echo "cd to webapp to install node modules"
cd webapp
sudo npm install


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Setup webapp.service                     |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
echo "cd to /lib/systemd/system"
cd
sudo cp -r webapp.service /lib/systemd/system


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Remove  Git                              |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
cd
sudo apt-get remove -y git


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                 INSTALL & CONFIGURE CLOUDWATCH              |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"

echo 'Downloading the CloudWatch Agent package...'
sudo wget https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb
 
echo 'Installing the CloudWatch Agent package...'
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
 
echo 'Enabling the CloudWatch Agent service...'
sudo systemctl enable amazon-cloudwatch-agent
sudo systemctl start amazon-cloudwatch-agent


