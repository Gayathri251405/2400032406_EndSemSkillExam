<noframes></noframes>import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './App.css';

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="sortable-item">
      {children}
    </div>
  );
}

function App() {
  const [courses, setCourses] = useState([
    'Introduction to React',
    'Advanced JavaScript',
    'Web Development Basics',
    'Data Structures and Algorithms',
    'Machine Learning Fundamentals'
  ]);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCourses((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="app">
      <h1>Course List</h1>
      <p>Drag and drop to reorder the courses:</p>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={courses} strategy={verticalListSortingStrategy}>
          <div className="course-list">
            {courses.map((course, index) => (
              <SortableItem key={course} id={course}>
                <div className="course-item">
                  {index + 1}. {course}
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <h2>Current Order:</h2>
      <ol>
        {courses.map((course, index) => (
          <li key={course}>{course}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
