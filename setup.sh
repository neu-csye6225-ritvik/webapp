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

# echo "sudo apt update"
# sudo apt update

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
echo "|                    UNZIP WEBAPP                             |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
sudo apt update
sudo apt install unzip

echo "check webapp.zip"
APP_FOLDER="/home/admin/"
echo "----Checking if the file exists----"
ls 

echo "copying the webapp to -" $APP_FOLDER

sudo mkdir -p $APP_FOLDER
unzip "webapp.zip" -d $APP_FOLDER


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Install Node Modules                     |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
echo "cd to webapp to install node modules"
cd webapp
npm install



echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Remove  Git                              |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
cd
sudo apt-get remove -y git