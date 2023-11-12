import { DynamicForm } from "@/components/DynamicForm";

export default function Home() {
 return (
  <main className="p-20 h-full flex items-center justify-center">
   <div className="h-full">
    <h1 className="text-3xl mb-6 font-bold text-center">How To Load Async Data in React-Hook-Form?</h1>
    <DynamicForm />
   </div>
  </main>
 );
}
