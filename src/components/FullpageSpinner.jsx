import '../assets/css/FullpageSpinner.css';

function FullpageSpinner() {
  return (
    <div className="fp-spinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default FullpageSpinner;