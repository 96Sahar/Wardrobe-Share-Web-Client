import Button from "../../../utils/Components/Button";
const Login = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold">Welcome to Wardrobe</h2>
      </div>

      <form className="flex flex-col items-center space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-gray-800 font-medium ">
            Email:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email address"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-gray-800 font-medium">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
          />
        </div>

        <Button>Login</Button>
      </form>
    </div>
  );
};

export default Login;
