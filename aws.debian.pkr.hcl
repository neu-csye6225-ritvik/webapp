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
  default = "ami-03c074e2fc8530284"
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "subnet_id" {
  type    = string
  default = "subnet-0ad2f289e66bbe333"
}

source "amazon-ebs" "my-ami2" {
  region          = "${var.aws_region}"
  ami_name        = "debian_csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  profile         = "dev"
  ami_description = "Debian AMI for CSYE 6225"
  ami_users       = ["686811303427", "038666155741"] ## DEV & DEMO
  aws_polling {
    delay_seconds = 30
    max_attempts  = 50
  }
  instance_type = "t2.micro"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
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


  provisioner "shell" {
    inline = [
      "sudo mkdir -p /tmp/apps/",
    ]
  }

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