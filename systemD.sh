#!/bin/bash
echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Create a new user for systemd            |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
sudo groupadd csye
sudo useradd -s /bin/false -g csye -d /home/csye -m csye
