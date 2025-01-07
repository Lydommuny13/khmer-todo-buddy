import { useState } from "react";
import { Todo } from "../types/todo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onToggle: (id: string) => void;
}

export const TodoItem = ({ todo, onDelete, onEdit, onToggle }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className={`group flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm animate-fade-in
                    ${todo.completed ? "bg-opacity-50" : ""}`}>
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="h-5 w-5"
      />
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <Button size="icon" variant="ghost" onClick={handleEdit}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}>
            {todo.text}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => onDelete(todo.id)}
              className="text-danger hover:text-danger"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};