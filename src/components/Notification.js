const Notification = ({ message, error }) => {
  if (!message || message === '') {
    return null;
  }

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
