import "./style.css";
import Notification from"../../img/notification2.svg"
import Message from"../../img/message.svg"
import Settings from"../../img/settings.svg"
import { useEffect, useState } from "react";


const Navbar = ({ socket }) => {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        socket.on("getNotification", data => {
            setNotifications(prev => [...prev, data]);
        });
    }, [socket]);

    console.log(notifications);

    const displayNotification = ({senderName, type}) => {
        let action;
        
        if (type === 1) {
            action = "liked";
        } else if ( type === 2) {
            action = "shared";
        } else {
            action = "shared";
        }

        return (
            <span className="notification">{`${senderName} ${action} your post`}</span>
        )
    }

    const handleReadFunction = () => {
        setNotifications([]);
        setOpen(false);
    }

    return (
        <div className="navbar">
            <span class="logo">Lama App</span>
            <div className="icons">
                <div className="icon">
                    <img src={Notification} className="iconImg" alt="" onClick={(event) => setOpen(!open)} />
                    { notifications.length > 0 && (
                        <div className="counter">{notifications.length}</div>
                    )}
                </div>
                <div className="icon">
                    <img src={Message} className="iconImg" alt="" onClick={(event) => setOpen(!open)} />
                </div>
                <div className="icon">
                    <img src={Settings} className="iconImg" alt="" onClick={(event) => setOpen(!open)} />
                </div>
            </div>
            { open && (
                <div className="notifications">
                    {notifications.map((notification) => (
                        displayNotification(notification)
                    ))}
                    <button className="notificationButton" onClick={handleReadFunction}>Mark as read</button>
                </div>
            )}
            
        </div>
    )
}

export default Navbar;