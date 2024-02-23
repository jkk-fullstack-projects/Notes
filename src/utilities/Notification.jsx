import { 
    notificationBaseClasses,
    notificationErrorClasses,
    notificationSuccessClasses } 
    from '../styles/styleConstants.jsx'

const Notification = ({ message, type }) => {
    const notificationClasses = `${notificationBaseClasses} ${type === 'error' ? 
    notificationErrorClasses : notificationSuccessClasses}`;


    return (
        message ? 
        <div className={notificationClasses}>{message}</div> : null
    )
};


export default Notification;
