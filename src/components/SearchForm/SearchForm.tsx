import { useState } from "react";
import type { FormEvent } from "react";
import css from "./SearchForm.module.css";

interface SearchFormProps {
  onSubmit: (query: string) => void;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search movies..."
        className={css.input}
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}