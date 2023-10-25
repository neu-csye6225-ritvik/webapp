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
echo "|                    UNZIP WEBAPP                             |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
sudo apt update
sudo apt install unzip

FOLDER="/opt"
sudo mkdir -p $FOLDER
sudo cp -r /tmp/webapp.zip $FOLDER
unzip "webapp.zip" -d $FOLDER
echo "----Checking if the file exists----"
ls 


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Install Node Modules                     |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
echo "cd to webapp to install node modules"
cd
cd /opt/webapp
npm install


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Setup webapp.service                     |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
echo "cd to /lib/systemd/system"
sudo cp -r webapp.service /lib/systemd/system


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Remove  Git                              |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
cd
sudo apt-get remove -y git




