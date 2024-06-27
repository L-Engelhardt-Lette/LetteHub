import "../scss/Colors.scss";

const DarkLightModeSwitch = () => {
  return (
    <label htmlFor="switch">
      <input type="checkbox" />
      <span className="slider"></span>
    </label>
  );
};
export default DarkLightModeSwitch;
