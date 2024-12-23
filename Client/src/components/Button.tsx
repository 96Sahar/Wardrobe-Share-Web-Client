interface ButtonProps {
  children?: React.ReactNode;
  color?: string;
}
const Button = ({ children, color = "red" }: ButtonProps) => {
  return (
    <div>
      <button style={{ background: color }}>yufuyvufthjv{children}</button>
    </div>
  );
};

export default Button;
