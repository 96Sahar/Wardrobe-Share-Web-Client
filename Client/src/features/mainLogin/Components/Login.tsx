const Login = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold">Welcome to Wardrobe</h2>
        <p className="text-gray-800 mt-2">Please log in to continue.</p>
      </div>

      <form className="flex flex-col items-center space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-gray-700 font-medium">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-neutral-200 border border-gray-800 rounded px-3 py-2 w-64"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-gray-700 font-medium">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-neutral-200 border border-gray-800 rounded px-3 py-2 w-64"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
