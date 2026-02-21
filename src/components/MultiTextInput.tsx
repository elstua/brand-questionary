"use client";

import { useState, useEffect, useId } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { MultiTextField } from "@/types/questionnaire";

interface MultiTextInputProps {
  fields: MultiTextField[];
  value: string[];
  onChange: (value: string[]) => void;
}

interface SortableFieldProps {
  field: MultiTextField;
  fieldId: string;
  index: number;
  fieldValue: string;
  onFieldChange: (index: number, text: string) => void;
}

function DragHandle() {
  return (
    <div className="flex flex-col gap-0.5 cursor-grab active:cursor-grabbing py-1 px-1 text-zinc-400 dark:text-zinc-500">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="5" cy="4" r="1.5" />
        <circle cx="11" cy="4" r="1.5" />
        <circle cx="5" cy="8" r="1.5" />
        <circle cx="11" cy="8" r="1.5" />
        <circle cx="5" cy="12" r="1.5" />
        <circle cx="11" cy="12" r="1.5" />
      </svg>
    </div>
  );
}

function SortableField({
  field,
  fieldId,
  index,
  fieldValue,
  onFieldChange,
}: SortableFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: fieldId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  const isNegative = field.variant === "negative";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${
        isDragging ? "shadow-lg" : ""
      } ${
        isNegative
          ? "border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20"
          : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
      }`}
    >
      {field.draggable && (
        <div {...attributes} {...listeners}>
          <DragHandle />
        </div>
      )}
      <div className="flex-1">
        <label
          className={`block text-xs font-medium mb-1 ${
            isNegative
              ? "text-red-600 dark:text-red-400"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          {field.label}
        </label>
        <input
          type="text"
          value={fieldValue}
          onChange={(e) => onFieldChange(index, e.target.value)}
          placeholder={field.placeholder}
          className={`w-full bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none text-sm ${
            isNegative ? "placeholder:text-red-300 dark:placeholder:text-red-800" : ""
          }`}
        />
      </div>
    </div>
  );
}

export default function MultiTextInput({
  fields,
  value,
  onChange,
}: MultiTextInputProps) {
  const dndId = useId();
  const draggableFields = fields.filter((f) => f.draggable);
  const pinnedFields = fields.filter((f) => !f.draggable);
  const hasDraggable = draggableFields.length > 0;

  const [order, setOrder] = useState<number[]>(() =>
    fields.map((_, i) => i)
  );

  const draggableIndices = order.filter((i) => fields[i]?.draggable);
  const pinnedIndices = order.filter((i) => !fields[i]?.draggable);

  const fieldIds = fields.map((_, i) => `field-${i}`);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const vals = value.length >= fields.length ? value : fields.map((_, i) => value[i] ?? "");

  const handleFieldChange = (originalIndex: number, text: string) => {
    const next = [...vals];
    next[originalIndex] = text;
    onChange(next);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldDragIdx = draggableIndices.indexOf(
      parseInt((active.id as string).replace("field-", ""))
    );
    const newDragIdx = draggableIndices.indexOf(
      parseInt((over.id as string).replace("field-", ""))
    );
    if (oldDragIdx < 0 || newDragIdx < 0) return;

    const newDraggableOrder = arrayMove(draggableIndices, oldDragIdx, newDragIdx);
    setOrder([...newDraggableOrder, ...pinnedIndices]);

    const reorderedValues = fields.map((_, i) => vals[i] ?? "");
    const draggableValues = newDraggableOrder.map((idx) => reorderedValues[idx]);
    const pinnedValues = pinnedIndices.map((idx) => reorderedValues[idx]);
    onChange([...draggableValues, ...pinnedValues]);
  };

  if (!hasDraggable) {
    return (
      <div className="space-y-3">
        {fields.map((field, i) => (
          <div
            key={i}
            className={`rounded-lg border px-3 py-2 ${
              field.variant === "negative"
                ? "border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20"
                : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            }`}
          >
            <label
              className={`block text-xs font-medium mb-1 ${
                field.variant === "negative"
                  ? "text-red-600 dark:text-red-400"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {field.label}
            </label>
            <input
              type="text"
              value={vals[i]}
              onChange={(e) => handleFieldChange(i, e.target.value)}
              placeholder={field.placeholder}
              className="w-full bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none text-sm"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <DndContext
        id={dndId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={draggableIndices.map((i) => fieldIds[i])}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {draggableIndices.map((originalIdx) => (
              <SortableField
                key={fieldIds[originalIdx]}
                fieldId={fieldIds[originalIdx]}
                field={fields[originalIdx]}
                index={originalIdx}
                fieldValue={vals[originalIdx]}
                onFieldChange={handleFieldChange}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {draggableIndices.length > 1 && (
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Drag to reorder by importance
        </p>
      )}

      {/* Pinned (non-draggable) fields */}
      {pinnedIndices.map((originalIdx) => {
        const field = fields[originalIdx];
        return (
          <div
            key={originalIdx}
            className={`rounded-lg border px-3 py-2 ${
              field.variant === "negative"
                ? "border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20"
                : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            }`}
          >
            <label
              className={`block text-xs font-medium mb-1 ${
                field.variant === "negative"
                  ? "text-red-600 dark:text-red-400"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {field.label}
            </label>
            <input
              type="text"
              value={vals[originalIdx]}
              onChange={(e) => handleFieldChange(originalIdx, e.target.value)}
              placeholder={field.placeholder}
              className={`w-full bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none text-sm ${
                field.variant === "negative"
                  ? "placeholder:text-red-300 dark:placeholder:text-red-800"
                  : ""
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
