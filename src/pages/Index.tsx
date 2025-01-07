import { useState } from "react";
import { Todo } from "../types/todo";
import { TodoItem } from "../components/TodoItem";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "../components/ui/use-toast";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const { toast } = useToast();

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
      };
      setTodos([todo, ...todos]);
      setNewTodo("");
      toast({
        description: "កិច្ចការថ្មីត្រូវបានបន្ថែម",
      });
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast({
      description: "កិច្ចការត្រូវបានលុប",
      variant: "destructive",
    });
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
    toast({
      description: "កិច្ចការត្រូវបានកែប្រែ",
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          បញ្ជីកិច្ចការ
        </h1>
        
        <div className="flex gap-2 mb-8">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="បញ្ចូលកិច្ចការថ្មី..."
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            className="flex-1"
          />
          <Button onClick={addTodo}>
            <Plus className="h-4 w-4 mr-2" />
            បន្ថែម
          </Button>
        </div>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">មិនមានកិច្ចការនៅឡើយទេ</p>
              <p className="text-gray-400">សូមបន្ថែមកិច្ចការថ្មី</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                onEdit={editTodo}
                onToggle={toggleTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;