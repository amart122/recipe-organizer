import '../assets/css/Toast.css';
import { useEffect } from 'react';

export const Toast = ({ message, show, setToast, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (show) {
        setToast(
          {
            message: '',
            show: false,
            type: ''
          }
        )
      }

      return () => clearTimeout(timer);
    }, 3000);
  })

  return (
    <div className={( show ? "in" : "out hidden") + " toast " + type}>
      <p>{message}
        <button onClick={() => setToast({ message: '', show: false, type: '' })}>X</button>
      </p>
    </div>
  );
}

export default Toast;