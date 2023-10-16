#!/bin/bash
echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Install NodeJS and NPM                   |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
echo "Node and npm"
sudo apt install nodejs npm -y

echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Install POSTGRESQL                       |"   
echo "|                                                             |"
echo "+-------------------------------------------------------------+"

echo "sudo apt update"
sudo apt update

echo "sudo apt install postgresql postgresql-contrib"
sudo apt install postgresql postgresql-contrib -y

echo "sudo systemctl start postgresql.service"
sudo systemctl status postgresql.service

echo "sudo -i -u postgres"
sudo -i -u postgres

# echo "psql"
# psql

# echo "Create user"
# CREATE USER webuser WITH PASSWORD 'webuser';

# echo "Grant privileges"
# GRANT ALL PRIVILEGES ON DATABASE postgres TO webuser;

# echo "Grant schema public"
# GRANT ALL ON SCHEMA public TO webuser;

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
