
function VidItem(props) {
  return (
    <div className={`youtube-thumbnail ${props.className}`}>
      <h1>{props.name}</h1>
      <img src={props.src} alt={props.name} />
      <button>Play</button>
      <h2>{props.description}</h2>
    </div>
  );
}
export default VidItem;