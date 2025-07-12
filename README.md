### 💻 My Cybersecurity Lab Project
This repository documents the setup and configuration of my personal cybersecurity lab, a virtual environment designed for learning and practicing cybersecurity concepts. Built using VirtualBox, this lab provides a safe and isolated space to experiment with security tools, monitor system activities, and analyze potential threats without impacting my host machine.

## 🔗 Project Website  
Check out the live demo here: [Tyrone’s Cyber Lab](https://cyberlab.tyrones.codes/)

---
## ✨ Project Overview
The core of this cybersecurity lab consists of three interconnected virtual machines and the powerful Wazuh security monitoring platform:

- **Ubuntu VM (Wazuh Manager):** The central hub of the lab, hosting the Wazuh server components (Manager, Indexer, Dashboard) for security information and event management (SIEM).

- **Kali Linux VM:** A specialized penetration testing distribution, equipped with a wide array of tools for ethical hacking and vulnerability assessment.

- **Windows 11 VM:** A representative target system that is monitored by Wazuh, allowing for real-world simulation of security events and agent deployment exercises.

## 🚀 Key Features & Setup Highlights
- **Virtualization with VirtualBox:** Utilizes Oracle VM VirtualBox to create and manage isolated virtual environments.

- **Comprehensive Network Configuration:** Detailed setup of internal networks for secure VM communication, alongside NAT for internet access where required.

- **Dynamic Disk Management:** Demonstrates the process of expanding virtual disk space to accommodate resource-intensive applications like Wazuh.

- **Wazuh Deployment:** Step-by-step installation of the Wazuh security platform for real-time threat detection, log analysis, and compliance monitoring.

- **Wazuh Agent Deployment:** Successful integration of the Wazuh agent on the Windows 11 VM for data collection and centralized monitoring.

- **Security Best Practices:** Includes steps for securing default administrative credentials for the Wazuh Dashboard.

## 🛠️ Lab Components
- **Hypervisor:** VirtualBox

- **Wazuh Server OS:** Ubuntu Server

- **Penetration Testing OS:** Kali Linux

- **Target OS:** Windows 11

- **Security Platform:** Wazuh (Manager, Indexer, Dashboard)

- **Networking:** Internal Network (lab-net) and NAT

## 📄 Detailed Documentation
For an in-depth guide on how this lab was built, including specific commands, network configurations, troubleshooting steps, and screenshots, please refer to the main project documentation:

View Detailed Lab Documentation
[cybersecurity-lab-project](https://github.com/Tyjay00/cybersecurity-lab-project)

## 🌐 Project Status
This cybersecurity lab is fully functional and serves as a robust learning environment. Future enhancements may include integrating more security tools, exploring advanced Wazuh features, and simulating various attack scenarios.

