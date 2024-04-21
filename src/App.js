import "@aws-amplify/ui-react/styles.css";

import { Suspense } from "react";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { generateClient } from "aws-amplify/api";
import { Authenticator } from "@aws-amplify/ui-react";

import { Header } from "./components/Header";
import { Loading } from "./components/Loading";
import { TodoTable } from "./components/TodoTable";
import { AddTodoForm } from "./components/AddTodoForm";


Amplify.configure(awsExports);
export const client = generateClient();

const App = () => {
  return (
    <div className="flex flex-col mx-auto justify-center items-center w-full min-h-screen bg-slate-900">
    <Authenticator>
      {({ signOut, user }) => (
        <main className="flex flex-col mx-auto justify-center items-center w-full min-h-screen bg-slate-900 space-y-4 flex-grow">
          <Header signOut={signOut} user={user} />
          <section className="flex flex-col mx-auto px-4 lg:px-8 space-y-4 flex-grow">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-4xl font-semibold text-gray-100">Todo Lists</h1>
              <AddTodoForm />
            </div>
            <Suspense fallback={<Loading />}>
            <TodoTable />
            </Suspense>
          </section>
        </main>
      )}
    </Authenticator>
    </div>
  );
};

export default App;
