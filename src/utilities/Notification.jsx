const Notification = ({ message, type }) => {
    const messageColor = type === 'error' ? 'text-red-600' : 'text-green-600';
    const backgroundColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
    const borderColor = type === 'error' ? 'border-red-400' : 'border-green-400';
    console.log("väri ", messageColor, " bg ", backgroundColor, " border ", borderColor)
    if (!message) return null;

    return (
        <div className={`text-green-600 bg-green-100 border-green-400 border px-4 py-3 rounded relative mb-4`}>
            {message}
        </div>
    );
};

export default Notification;
