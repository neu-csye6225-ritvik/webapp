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

# echo "create db"
# CREATE DATABASE webapp;

echo "Create user"
CREATE USER webuser WITH PASSWORD 'webuser';
# sudo -u postgres psql -c "ALTER ROLE webuser SET client_encoding TO 'utf8';"
# sudo -u postgres psql -c "ALTER ROLE webuser SET default_transaction_isolation TO 'read committed';"
# sudo -u postgres psql -c "ALTER ROLE webuser SET timezone TO 'UTC';"

echo "Grant privileges"
GRANT ALL PRIVILEGES ON DATABASE postgres TO webuser;

echo "Grant schema public"
GRANT ALL ON SCHEMA public TO webuser
