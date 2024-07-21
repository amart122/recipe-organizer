import '../assets/css/Toast.css';
import { useEffect } from 'react';

export const Toast = ({ message, show, setShow, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (show) {
        setShow(
          {
            message: '',
            show: false,
            type: ''
          }
        )
      }

      return () => clearTimeout(timer);
    }, 30000);
  })

  return (
    <div className={( show ? "in" : "out hidden") + " toast " + type}>
      <p>{message}
        <button onClick={() => setShow({ message: '', show: false, type: '' })}>X</button>
      </p>
    </div>
  );
}

export default Toast;