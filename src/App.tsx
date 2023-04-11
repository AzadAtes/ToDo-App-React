import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import ImportantView from "./components/views/ImportantView";
import MyDayView from "./components/views/MyDayView";
import PlannedView from "./components/views/PlannedView";
import SearchView from "./components/views/SearchView";
import TasksView from "./components/views/TasksView";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <div className="m-0 p-0">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <div className="h-10"></div>
          <div>
            <SideBar />
            <div className="ml-36 flex flex-col bg-slate-800 text-slate-100">
              <Routes>
                <Route path="/important" element={<ImportantView />} />
                <Route path="/myday" element={<MyDayView />} />
                <Route path="/planned" element={<PlannedView />} />
                <Route path="/search" element={<SearchView />} />
                <Route path="/" element={<TasksView />} />
                <Route path="/tasks" element={<TasksView />} />
                <Route path="/tasks/:taskIdParam" element={<TasksView />} />
              </Routes>
            </div>
          </div>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
