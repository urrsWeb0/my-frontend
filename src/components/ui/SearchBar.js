import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value = "", onChange, placeholder = "Search...", onSubmit }) {
  const submit = (event) => {
    event.preventDefault();
    const nextValue = value.trim();
    if (onSubmit) onSubmit(nextValue);
  };

  return (
    <form className="input-group" onSubmit={submit} role="search">
      <span className="input-group-text bg-body border-end-0" aria-hidden="true">
        <FiSearch className="text-muted" />
      </span>
      <input
        type="search"
        className="form-control border-start-0"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        aria-label={placeholder}
        autoComplete="off"
      />
      <button type="submit" className="btn btn-primary px-3" aria-label="Submit search">
        Search
      </button>
    </form>
  );
}
