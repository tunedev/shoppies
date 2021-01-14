const Notification = ({ message, error }) => {
  if (!message || message === '') {
    return null;
  }

  return (
    <div className={`notification ${error ? 'error' : ''}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
