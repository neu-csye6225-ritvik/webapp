packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.0.0"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9"
}

variable "PGPassword" {
  type    = string
  default = "password"
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "subnet_id" {
  type    = string
  default = "subnet-0ad2f289e66bbe333"
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "ami_description" {
  type    = string
  default = "Debian AMI for CSYE 6225"
}

variable "profile" {
  type    = string
  default = "dev"
}

variable "ami_users" {
  type    = list(string)
  default = ["686811303427", "038666155741"]
}

source "amazon-ebs" "my-ami2" {
  region          = "${var.aws_region}"
  ami_name        = "debian_csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  profile         = "${var.profile}"
  ami_description = "${var.ami_description}"
  ami_users       = "${var.ami_users}" ## DEV & DEMO
  aws_polling {
    delay_seconds = 30
    max_attempts  = 50
  }
  instance_type = "${var.instance_type}"
  // source_ami    = "${var.source_ami}"
  source_ami_filter {
    filters = {
      name                = "debian-12-amd64-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["amazon"]
  }
  ssh_username = "${var.ssh_username}"
  vpc_filter {
    filters = {
      "isDefault" : "true"
    }
  }

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
    # encrypted            = true 
  }
}


build {
  sources = ["source.amazon-ebs.my-ami2"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "~/webapp.zip"
  }

  provisioner "shell" {
    scripts = [
      "./setup.sh",
    ]
  }

  }


