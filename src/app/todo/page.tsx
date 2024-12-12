'use client';

import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import callServer from '@/lib/call-server';
import { useEffect, useRef, useState } from 'react';
import { cookies } from 'next/headers';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<{ finished: boolean; title: string }>({
    finished: false,
    title: '',
  });

  const handleAddTodo = async () => {
    if (!todo.title.length) return;
    await callServer<Todo>('/api/todo', {
      method: 'POST',
      body: JSON.stringify({ ...todo }),
    })
      .then(async ([_, data]) => {
        const todo = await data;
        setTodos(prevState => [...prevState, todo]);
        setTodo({ finished: false, title: '' });
      })
      .catch(r => console.error(r));
  };

  const handleCheckTodo = async (finished: boolean, id: string) => {
    await callServer<{ todo: Todo }>('/api/todo', {
      method: 'PUT',
      body: JSON.stringify({ finished, id }),
    })
      .then(async ([_, data]) => {
        const body = (await data).todo;
        setTodos(prevState =>
          prevState.map(todo =>
            todo.id === body.id ? { ...todo, finished: body.finished } : todo,
          ),
        );
      })
      .catch(r => console.error(r));
  };

  useEffect(() => {
    (async () => {
      await callServer<{ todos: Todo[] }>('/api/todo', {
        method: 'GET',
      })
        .then(async ([_, data]) => {
          const todos = (await data).todos;
          setTodos(todos);
        })
        .catch(e => console.error(e));
    })();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <Card className="flex flex-col p-4 justify-between gap-4 dark w-[20rem] relative">
        <CardTitle className="text-2xl">Create new todo</CardTitle>
        <div className="flex gap-2 items-center">
          <Checkbox
            checked={todo.finished}
            onClick={() =>
              setTodo(prevState => ({ ...todo, finished: !todo.finished }))
            }
          />
          <input
            placeholder="todo title"
            value={todo.title}
            className="outline-none bg-transparent p-0"
            onChange={e =>
              setTodo(prevState => ({ ...todo, title: e.target.value }))
            }
          />
        </div>
        <Separator orientation="horizontal" />
        <CardTitle className="text-2xl">Recent todos:</CardTitle>
        <div className="flex flex-col gap-2 overflow-y-scroll h-[20rem]">
          {todos.map(todo => (
            <div className="flex gap-2 items-center" key={todo.id}>
              <Checkbox
                checked={todo.finished}
                id={`checkbox[${todo.id}]`}
                onClick={() => handleCheckTodo(!todo.finished, todo.id)}
              />
              <label
                htmlFor={`checkbox[${todo.id}]`}
                onClick={() => handleCheckTodo(!todo.finished, todo.id)}
              >
                {todo.title}
              </label>
            </div>
          ))}
        </div>
        <Button disabled={!todo.title.length} onClick={handleAddTodo}>
          Add todo
        </Button>
      </Card>
    </div>
  );
}

type Todo = { title: string; finished: boolean; id: string; userId: string };
