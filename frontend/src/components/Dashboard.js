import React, { useState, useEffect } from "react";
import { SocketProvider } from "../context/socketContext";
import GroupWindow from "./groupPane/GroupWindow";
import ChatWindow from "./chatPane/ChatWindow";

function Dashboard() {
  const [currentChat, setCurrentChat] = useState(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const rootElement = document.getElementById('root');
      const navbarElement = document.getElementsByClassName('Navbar');
      if (rootElement && navbarElement) {
        console.log("Root", rootElement.clientHeight);
        console.log("Navbar", navbarElement[0].clientHeight);
        console.log((rootElement.clientHeight - navbarElement[0].clientHeight));
      }
    };

    // Call the updateHeight function after the initial render
    updateHeight();

    // Attach an event listener for window resize events
    window.addEventListener('resize', updateHeight);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []); // Empty dependency array means this effect runs only once after initial render


  return (
      <div className="Dashboard flex grow">
        <h1>{height}</h1>
        <SocketProvider>
          <GroupWindow
            setCurrentChat={setCurrentChat}
            currentChat={currentChat}
          />
          {currentChat && <ChatWindow groupID={currentChat} />}
        </SocketProvider>
      </div>
  );
}

export default Dashboard;
