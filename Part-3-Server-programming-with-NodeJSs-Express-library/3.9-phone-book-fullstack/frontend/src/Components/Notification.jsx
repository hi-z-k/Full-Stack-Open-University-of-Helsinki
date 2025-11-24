

const Notification = ({data}) => {
  const {message,type} = data
  if (!message) {
    return null;
  }
  return <div className={type}>{message}</div>;
};

export default Notification;
