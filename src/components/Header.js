import { Button } from "antd";
export const Header = ({ signOut, user }) => {
  return (
    <header className="w-full h-20 flex justify-between items-center px-4 lg:px-8 border-b border-gray-600 bg-slate-900">
      <h1 className="text-3xl text-gray-100 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-bold ">
        AWS Amplify
      </h1>
      <nav className="hidden md:flex flex-row gap-4 items-center">
        <div className="border border-gray-500 hover:border-gray-300 hover:bg-slate-600 rounded-lg px-5 py-1 text-gray-100">
          {user.username && "Hi there 👋"}
        </div>
        <Button type="primary" onClick={signOut}>
          Sign Out
        </Button>
      </nav>
    </header>
  );
};
