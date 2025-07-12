import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const ZoomableImage = ({ src, alt, className, onClick }) => {
    return (
        <img
            src={src}
            alt={alt}
            className={`${className} cursor-pointer transition-transform duration-200 hover:scale-[1.02]`}
            onClick={() => onClick(src, alt)}
        />
    );
};

const App = () => {
    const sectionsRef = useRef([]);
    const zoomModalRef = useRef(null);
    const zoomedImageRef = useRef(null);

    const [zoomedImageSrc, setZoomedImageSrc] = useState(null);
    const [zoomedImageAlt, setZoomedImageAlt] = useState('');

    // Function to add elements to the sections ref array for scroll animations
    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    // Function to handle opening the image zoom modal
    const handleImageClick = useCallback((src, alt) => {
        setZoomedImageSrc(src);
        setZoomedImageAlt(alt);

        // Animate modal and image in
        gsap.to(zoomModalRef.current, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.3,
            ease: "power2.out"
        });
        gsap.fromTo(zoomedImageRef.current,
            { scale: 0.8, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
        );
    }, []);

    const handleCloseZoom = useCallback(() => {
        gsap.to(zoomedImageRef.current,
            {
                scale: 0.8,
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    gsap.to(zoomModalRef.current, {
                        opacity: 0,
                        pointerEvents: 'none',
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: () => {
                            setZoomedImageSrc(null);
                            setZoomedImageAlt('');
                        }
                    });
                }
            }
        );
    }, []);

    // Effect for general page animations (header, scroll sections)
    useEffect(() => {
        sectionsRef.current = [];

        // Animate header on load
        gsap.fromTo(".header-title",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
        gsap.fromTo(".header-subtitle",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
        );

        // Animate each section as it scrolls into view
        sectionsRef.current.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, y: 50, scale: 0.98 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "bottom top",
                        toggleActions: "play none none none",
                        
                    }
                }
            );
        });

        // Cleanup function for ScrollTrigger instances when component unmounts
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Effect for handling Esc key to close zoom modal
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && zoomedImageSrc) {
                handleCloseZoom();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [zoomedImageSrc, handleCloseZoom]);

    return (
        <div className="relative min-h-screen font-sans bg-gray-50 text-gray-900">
            <div className="absolute inset-0 bg-white opacity-90"></div>
            <div className="relative z-10 container mx-auto p-4 sm:p-8 lg:p-12 w-full">

                {/* Header Section */}
                <header className="text-center mb-12 py-8 bg-blue-600 text-white rounded-lg shadow-xl border-b-4 border-blue-800">
                    <h1 className="header-title text-4xl sm:text-5xl font-bold mb-2">My Cybersecurity Lab</h1>
                    <p className="header-subtitle text-lg sm:text-xl opacity-90">Building a Secure Virtual Environment</p>
                </header>

                {/* Introduction */}
                <section ref={addToRefs} className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Cybersecurity Lab </h2>
                    <p className="mb-4">
                        My cybersecurity lab is a safe, controlled environment where I can learn about and practice cybersecurity concepts. I built it using <strong className="font-bold text-blue-600">VirtualBox</strong>, a free program that allows me to run different operating systems as "virtual machines" (VMs) right on my main computer. This setup lets me experiment with security tools and scenarios without affecting my primary system.
                    </p>

                    <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/architecture.png"
                            alt="VirtualBox Manager showing VMs"
                            className="rounded-lg shadow-lg max-w-full h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                    <p className="mb-4">
                        In this project, I set up three key virtual machines and a powerful security monitoring platform:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong className="font-bold text-green-700">Ubuntu VM:</strong> This serves as the "brain" of my lab, hosting the Wazuh security platform.</li>
                        <li><strong className="font-bold text-red-700">Kali Linux VM:</strong> A specialized Linux system packed with tools for penetration testing and ethical hacking.</li>
                        <li><strong className="font-bold text-blue-700">Windows 11 VM:</strong> A standard Windows computer that I monitor for security events.</li>
                        <li><strong className="font-bold text-yellow-700">Wazuh:</strong> A powerful, open-source security platform that helps detect threats, monitor systems, and collect security data.</li>
                    </ul>
                </section>

                {/* VirtualBox Environment Section */}
                <section ref={addToRefs} className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">My VirtualBox Environment</h2>
                    <p className="mb-4">
                        At the heart of my cybersecurity lab is <strong className="font-bold text-blue-600">Oracle VM VirtualBox</strong>. This software allows me to create and run multiple virtual machines on my single physical computer. Each VM operates as an independent computer, complete with its own operating system, applications, and network settings, all isolated from my main system.
                    </p>
                    <p className="mb-4">
                        Here's a view of my VirtualBox Manager, showing the different virtual machines I've set up for my lab:
                    </p>
                    <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/VMs.png"
                            alt="VirtualBox Manager showing VMs"
                            className="rounded-lg shadow-lg max-w-full h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-600 text-center">My VirtualBox Manager with Ubuntu, Kali, and Windows 11 VMs.</p>
                    <ul className="list-disc list-inside space-y-2 mt-4">
                        <li>The <strong className="font-bold text-green-700">Ubuntu VM:</strong> is configured with 4GB of RAM and 3 processors, providing ample resources for Wazuh.</li>
                        <li>All VMs are connected to a custom internal network, which is crucial for lab communication.</li>
                    </ul>
                </section>


                {/* Initial VM Setup & Enhancements */}
                <section ref={addToRefs} className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200"> 
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Phase 1: Setting Up My Virtual Machines </h2>
                    <p className="mb-4">
                        I began by creating my Ubuntu, Kali Linux, and Windows 11 virtual machines in VirtualBox. This involved downloading each operating system's "ISO" file (like a digital DVD) and then creating a new VM in VirtualBox, using that ISO to install the operating system.
                    </p>
                    <p className="mb-2">
                        To make my VMs work smoothly with my main computer (Windows), I installed <strong className="font-bold text-blue-600">VirtualBox Guest Additions</strong>. This enabled crucial features like copy-paste functionality and automatic screen resizing.
                    </p>

                    <h3 className="text-xl font-medium text-blue-600 mb-3">My Ubuntu VM Setup</h3>
                    <p className="mb-2">
                        My Ubuntu VM is the core of my lab, where I host the Wazuh security platform. After installing Ubuntu, I focused on making it user-friendly.
                    </p>
                    
                    <div className="my-6 flex justify-center">
                    <ZoomableImage
                            src="/ubuntu.png"
                            alt="Ubuntu Logged In Screen"
                            className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-600 text-center">Ubuntu VM Desktop</p>
                
                    <h3 className="text-xl font-medium text-blue-600 mb-3 mt-8">My Kali Linux VM Setup</h3> 
                    <p className="mb-2">
                        My Kali Linux VM is an essential tool for practicing penetration testing and ethical hacking techniques. It comes pre-loaded with a wide array of security tools.
                    </p>
                    <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/Kalimachine.png"
                            alt="Kali Linux Login Screen"
                            className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-600 text-center">Kali Linux VN Desktop</p>

                    <h3 className="text-xl font-medium text-blue-600 mb-3 mt-8">My Windows 11 VM Setup </h3> 
                    <p className="mb-2">
                        The Windows 11 VM represents a typical target system that I monitor within my lab. It allows me to simulate real-world scenarios and observe how security events unfold.
                    </p>
                    <div className="my-6 flex justify-center">
                        {/* Placeholder for Windows 11 image. */}
                        <ZoomableImage
                            src="/windows11machine.png"
                            alt="Windows 11 VM Desktop"
                            className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-600 text-center">Windows 11 VM Desktop</p>
                </section>
                <section ref={addToRefs} className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Phase 2: Comprehensive Network Configuration & Troubleshooting </h2>
                    <p className="mb-4">
                        Setting up the network was crucial to allow my virtual machines to communicate with each other and for the Ubuntu VM to access the internet. I configured each VM to be part of a private "lab network" and ensured my Ubuntu VM also had internet connectivity.
                    </p>

                    <h3 className="text-xl font-medium text-blue-600 mb-3">My Network Goals and Configuration:</h3>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                        <li><strong className="font-bold text-green-700">Ubuntu VM:</strong>
                        
                    <p className="mb-2">I used <strong className="font-bold">Netplan</strong> in Ubuntu to apply these network settings:</p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>I opened the Netplan configuration file:
                            <pre className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto text-gray-800"><code>sudo nano /etc/netplan/00-installer-config.yaml</code></pre>
                        </li>
                        <li>I entered the following configuration, ensuring correct indentation for my two network adapters:
                            <pre className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto text-gray-800"><code>network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      dhcp4: true
    enp0s8:
      dhcp4: false
      addresses: [192.168.100.20/24]</code></pre>
                            <div className="my-6 flex justify-center">
                                <ZoomableImage
                                    src="/ubuntu-network.png"
                                    alt="Netplan Configuration in Nano"
                                    className="rounded-lg shadow-lg max-w-full h-auto border border-gray-300"
                                    onClick={handleImageClick}
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-600 text-center">Ubuntu Netplan configuration for dual network adapters.</p>
                        </li>
                        <li>I saved the file (<code className="font-mono">Ctrl+O</code>, <code className="font-mono">Enter</code>) and exited (<code className="font-mono">Ctrl+X</code>).</li>
                        <li>I applied the Netplan configuration:
                            <pre className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto text-gray-800"><code>sudo netplan try
sudo netplan apply</code></pre>
                        </li>
                        <li>(Optional but Recommended) I fixed file permissions for security:
                            <pre className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto text-gray-800"><code>sudo chmod 600 /etc/netplan/*.yaml</code></pre>
                        </li>
                    </ol>

                            <ul className="list-circle list-inside ml-4">
                                <li><code className="font-mono">Adapter 1 (enp0s3):</code> Configured with <strong className="font-bold">NAT (Network Address Translation)</strong> for internet access.</li>
                                <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/ubuntu-enp0s3.png"
                            alt="Ubuntu Network"
                            className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                                <li><code className="font-mono">Adapter 2 (enp0s8):</code> Set up as an <strong className="font-bold">Internal Network</strong> called <code className="font-mono">lab-net</code> with a static IP address of <code className="font-mono">192.168.100.20</code>.</li>
                                <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/ubuntu-network2.png"
                            alt="Ubuntu Network"
                            className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                            </ul>
                        </li>
                        <li><strong className="font-bold text-red-700">Kali Linux VM:</strong> Configured its network adapter (typically <code className="font-mono">eth1</code> or similar) to be part of the <strong className="font-bold">Internal Network</strong> <code className="font-mono">lab-net</code> with a static IP address of <code className="font-mono">192.168.100.10</code>.
                           <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/kali-wired.jpg"
                            alt="Kali Network"
                            className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                    <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/Kali-networkdone.png"
                            alt="Kali Network"
                            className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                        </li>
                        <li><strong className="font-bold text-blue-700">Windows 11 VM:</strong> Configured its Ethernet adapter to be part of the <strong className="font-bold">Internal Network</strong> <code className="font-mono">lab-net</code> with a static IP address of <code className="font-mono">192.168.100.30</code>.
                        <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/windows-network.png"
                            alt="Windows Network"
                            className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                    <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/windows-network1.png"
                            alt="Windows Network"
                            className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                    <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/windows-network3.png"
                            alt="Windows Network"
                            className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                    <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/windows-network2.png"
                            alt="Windows Network"
                            className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                            
                        </li>
                    </ul>
                </section>
            {/* Wazuh Installation */}
                <section ref={addToRefs} className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200"> 
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Phase 3: Installing Wazuh, the Security Platform </h2>
                    <p className="mb-4">
                        With sufficient disk space and a robust network, I proceeded with the Wazuh installation. I opted for the official automated installation script for an all-in-one setup.
                    </p>
                    <h3 className="text-xl font-medium text-blue-600 mb-3">My Wazuh Installation Steps:</h3> {/* Adjusted heading color */}
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong className="font-bold">System Preparation:</strong> I ensured my Ubuntu system was updated and had necessary dependencies:
                            <pre className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto text-gray-800"><code>sudo apt update && sudo apt upgrade -y
sudo apt install curl apt-transport-https wget openjdk-17-jdk -y</code></pre>
                        </li>
                        <li><strong className="font-bold">Cleaned Up Previous Attempts:</strong> Before running the main script, I performed a thorough cleanup to ensure no partial installations remained:
                            <pre className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto text-gray-800"><code>sudo bash ./wazuh-install.sh -u</code></pre>
                            This removed any lingering Wazuh components.
                        </li>
                        <li><strong className="font-bold">Ran the Wazuh All-in-One Installation Script:</strong>
                            <pre className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto text-gray-800"><code>curl -sO https://packages.wazuh.com/4.12/wazuh-install.sh && sudo bash ./wazuh-install.sh -a</code></pre>
                            I let the script run to completion without interruption. It successfully installed the Wazuh Manager, Wazuh Indexer, Filebeat, and Wazuh Dashboard.
                            <div className="my-6 flex justify-center">
                                <ZoomableImage
                                    src="/wuzah-complete.png"
                                    alt="Successful Wazuh Installation Summary"
                                    className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                                    onClick={handleImageClick}
                                />
                            </div>
                            The script provided the crucial access details:
                            <ul className="list-disc list-inside ml-4 mt-2">
                                <li><strong className="font-bold">Web Interface:</strong> <code className="font-mono">https://&lt;wazuh-dashboard-ip&gt;:443</code> (which translates to <code className="font-mono">https://192.168.100.20</code>)</li>
                                <li><strong className="font-bold">User:</strong> <code className="font-mono">admin</code></li>
                                <li><strong className="font-bold">Password:</strong> <code className="font-mono">g?FNGXUqn1wy+WgRTDULuV9tu80Mb4Uz</code> (This password has changed and is only for demonstration purposes)</li>
                            </ul>
                        </li>
                    </ol>
                </section>

                 {/* Accessing Dashboard & Password Change */}
                <section ref={addToRefs} className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200"> 
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Phase 4: Accessing and Securing the Wazuh Dashboard</h2> 
                    <p className="mb-4">
                        With Wazuh successfully installed, the next step was to access its web interface and secure the default administrative account.
                    </p>
                    <h3 className="text-xl font-medium text-blue-600 mb-3">Accessing the Dashboard:</h3>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>I opened a web browser on my Windows host machine.</li>
                        <li>I navigated to <code className="font-mono">https://192.168.100.20</code>.</li>
                        <li>I bypassed the browser's certificate warning (common for self-signed certificates).</li>
                        <li>I logged in using the username <code className="font-mono">admin</code> and the password provided by the installation script.</li>
                    </ol>
                    <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/wazuh-dash.png"
                            alt="Wazuh Dashboard Login Screen"
                            className="rounded-lg shadow-lg max-w-md h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                    <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/agent-dep.png"
                            alt="Wazuh Dashboard Overview"
                            className="rounded-lg shadow-lg max-w-full h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>

                    <h3 className="text-xl font-medium text-blue-600 mb-3 mt-6">Changing the Admin Password:</h3>
                    <p className="mb-2">
                        For security best practices, I changed the default <code className="font-mono">admin</code> password. I learned that the <code className="font-mono">admin</code> user is a special, reserved account for the underlying OpenSearch security plugin, and its password needs to be changed via the command line on the Ubuntu VM, not directly through the web interface.
                    </p>
                 
                    <div className="mt-4 p-4 rounded-md bg-green-100 text-green-800 border border-green-300">
                        <p className="font-bold">My Solution ✅:</p>
                        <p>I used the <code className="font-mono">opensearch-cli securityadmin</code> tool in the Ubuntu terminal to update the password:</p>
                        <pre className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto mt-2 text-gray-800"><code>/usr/share/wazuh-indexer/bin/opensearch-cli securityadmin --cluster-name opensearch-cluster -cd /usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig -cn wazuh-admin -p &lt;NEW_PASSWORD&gt; -h 192.168.100.20</code></pre>
                        <p className="mt-2">I provided the old <code className="font-mono">admin</code> password when prompted and then successfully logged in with my new credentials.</p>
                    </div>
                </section>

                {/* Agent Deployment & Monitoring Success Section */}
                <section ref={addToRefs} className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200"> 
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Phase 5: Agent Deployment & Monitoring Success </h2>
                    <p className="mb-4">
                        After successfully setting up the network and configuring the Wazuh Manager, the next critical step was to deploy the Wazuh agent to my Windows 11 VM. This agent acts as a sensor, collecting security data from the Windows system and forwarding it to the Wazuh Manager for analysis.
                    </p>
                    <p className="mb-4">
                        I used the command provided by the Wazuh Dashboard to download and install the agent silently. Upon successful installation and service startup, I verified its connection and active status directly within the Wazuh Dashboard.
                    </p>
                    <div className="my-6 flex justify-center">
                        <ZoomableImage
                            src="/agent-dep1.png"
                            alt="Wazuh Dashboard showing Active Windows 11 Agent"
                            className="rounded-lg shadow-lg max-w-full h-auto border border-gray-300"
                            onClick={handleImageClick}
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-600 text-center">
                        The Wazuh Dashboard proudly displays the "windows11-tyronelab" agent as active, confirming successful communication and data collection. This is a critical validation of the entire lab setup!
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-4">
                        <li><strong className="font-bold text-green-700">Agent Name:</strong> <code className="font-mono">windows11-tyronelab</code></li>
                        <li><strong className="font-bold text-green-700">Status:</strong> Active ✅</li>
                        <li><strong className="font-bold text-green-700">IP Address:</strong> <code className="font-mono">192.168.100.30</code></li>
                    </ul>
                    <p className="mt-4">
                        With the agent active, my lab is now fully operational for real-time security monitoring, log analysis, and threat detection exercises.
                    </p>
                </section>


                {/* Conclusion */}
                <section ref={addToRefs} className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Conclusion: My Functional Cybersecurity Lab </h2>
                    <p className="mb-4">
                        Building this cybersecurity lab has been a valuable learning experience. I successfully set up virtual machines, configured complex networks, expanded disk space, and deployed the Wazuh security platform. This project demonstrates my ability to manage virtual environments, troubleshoot technical challenges, and implement essential security tools.
                    </p>
                    <p className="mb-4">
                        My lab is now fully operational, providing a robust environment to further my cybersecurity skills by deploying agents, analyzing security events, and exploring threat detection capabilities.
                    </p>
                    <div className="text-center mt-8">
                        <a href="https://github.com/Tyjay00/cybersecurity-lab-project" target="_blank" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out">
                            View Project on GitHub
                        </a>
                    </div>
                </section>

            </div>

            {/* Zoom Modal Overlay */}
            {zoomedImageSrc && (
                <div
                    ref={zoomModalRef}
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 opacity-0 pointer-events-none"
                    onClick={handleCloseZoom} // Close on overlay click
                >
                    <img
                        ref={zoomedImageRef}
                        src={zoomedImageSrc}
                        alt={zoomedImageAlt}
                        className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl transform scale-0 opacity-0"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image itself
                    />
                    <button
                        className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer p-2 rounded-full bg-gray-700 bg-opacity-50 hover:bg-opacity-75 transition-colors"
                        onClick={handleCloseZoom}
                        aria-label="Close image zoom"
                    >
                        &times;
                    </button>
                    <p className="absolute bottom-4 text-white text-sm text-center px-4 py-2 bg-gray-700 bg-opacity-50 rounded-md">
                        {zoomedImageAlt} (Click or press ESC to close)
                    </p>
                </div>
            )}
        </div>
    );
};

export default App;
