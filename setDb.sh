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

echo "cp webapp.service for systemd"
sudo cp -r webapp.service /lib/systemd/system
echo "copied success"


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Remove  Git                              |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
cd
sudo apt-get remove -y git

Domains to Validate
www.demo.ritvikparamkusham.me PRIMARY DOMAIN

Host
_D97217B1A7A17AAAE783F2CD48FF18B1.demo.ritvikparamkusham.me

Target
CB5201FED5107015560A3C42885487A6.D3D6B60DABF4D2674FF18BB555796E47.656bb9a1d2532.comodoca.com

aws acm import-certificate --certificate file://Certificate.pem --certificate-chain file://CertificateChain.pem --private-key file://PrivateKey.pem --profile demo

sudo openssl req -new -newkey rsa:2048 -nodes -keyout private.key -out csr.pem

aws acm import-certificate --certificate /Users/ritvikparamkusham/Downloads/Cloud/project10/www_demo_ritvikparamkusham_me/www_demo_ritvikparamkusham_me.crt --certificate-chain /Users/ritvikparamkusham/Downloads/Cloud/project10/www_demo_ritvikparamkusham_me/www_demo_ritvikparamkusham_me.ca-bundle --private-key /Users/ritvikparamkusham/Downloads/Cloud/project10/private.key --profile demo

aws acm import-certificate --certificate /Users/ritvikparamkusham/Desktop/aws-SSL/certificate_base64.pem --certificate-chain /Users/ritvikparamkusham/Desktop/aws-SSL/chain.pem --private-key /Users/ritvikparamkusham/Desktop/aws-SSL/private_base64.pem --profile demo

aws acm import-certificate --certificate /Users/ritvikparamkusham/Desktop/aws-SSL/certificate.pem --certificate-chain /Users/ritvikparamkusham/Desktop/aws-SSL/chain.pem --private-key /Users/ritvikparamkusham/Desktop/aws-SSL/private.pem --profile demo

aws acm import-certificate --certificate /Users/ritvikparamkusham/Desktop/aws-SSL/certificate_base64.crt --certificate-chain /Users/ritvikparamkusham/Desktop/aws-SSL/chain.pem --private-key /Users/ritvikparamkusham/Desktop/aws-SSL/private_base64.pem --profile demo

openssl x509 -in /Users/ritvikparamkusham/Desktop/aws-SSL/certificate_base.crt -out /Users/ritvikparamkusham/Desktop/aws-SSL/certificate.pem -outform PEM
openssl x509 -in /Users/ritvikparamkusham/Desktop/aws-SSL/chain.ca-bundle -out /Users/ritvikparamkusham/Desktop/aws-SSL/chain.pem -outform PEM

openssl rsa -in /Users/ritvikparamkusham/Desktop/aws-SSL/ssl.key -outform PEM -out /Users/ritvikparamkusham/Desktop/aws-SSL/private.pem

 base64 -i private.pem -o private_base64.pem