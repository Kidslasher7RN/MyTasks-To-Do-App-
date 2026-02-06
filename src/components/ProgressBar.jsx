import "./ProgressBar.css";

export default function ProgressBar() {
  return (
    <div className="container">
      <div className="info">
        <p>Daily Progress</p> <span>33%</span>
      </div>
      <div className="prog-bar" />
    </div>
  );
}
