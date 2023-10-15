#!/bin/bash 
echo "sudo apt update"
sudo apt update

echo "sudo apt install postgresql postgresql-contrib"
sudo apt install postgresql postgresql-contrib

echo "sudo systemctl start postgresql.service"
sudo systemctl start postgresql.service

echo "sudo -i -u postgres"
sudo -i -u postgres

echo "psql"
psql

echo "Create user"
CREATE USER webuser WITH PASSWORD 'webuser';

echo "Grant privileges"
GRANT ALL PRIVILEGES ON DATABASE postgres TO webuser;

echo "Grant schema public"
GRANT ALL ON SCHEMA public TO webuser;
