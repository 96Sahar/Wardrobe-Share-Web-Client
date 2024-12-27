import "../style/ButtonStyle.css";
interface ButtonProps {
  children?: React.ReactNode;
  color?: string;
}
const Button = ({ children, color = "red" }: ButtonProps) => {
  return (
    <div>
      <button className="ButtonComponent" style={{ background: color }}>
        yufuyvufthjv{children}
      </button>
    </div>
  );
};

export default Button;
