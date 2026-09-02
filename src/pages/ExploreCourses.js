import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter, FaStar, FaUser, FaTimes } from "react-icons/fa";

const categories = ["All", "IT & Software", "Business", "Leadership", "Personal Development", "Communication"];

const courses = [
  { id: 1, title: "Python for Beginners", instructor: "John Doe", rating: 4.8, students: "1.2k", price: "Free", category: "IT & Software", image: "https://img.freepik.com/free-photo/programming-background-concept_23-2149151158.jpg" },
  { id: 2, title: "Digital Marketing", instructor: "Neha Verma", rating: 4.6, students: "900", price: "Free", category: "Business", image: "https://img.freepik.com/free-photo/digital-marketing-concept_23-2149151160.jpg" },
  { id: 3, title: "Web Development", instructor: "Rahul Singh", rating: 4.7, students: "1.5k", price: "Free", category: "IT & Software", image: "https://img.freepik.com/free-photo/web-development-programming_23-2149151161.jpg" },
  { id: 4, title: "Data Analytics", instructor: "Sarah Khan", rating: 4.9, students: "2.1k", price: "Free", category: "IT & Software", image: "https://img.freepik.com/free-photo/data-analysis-chart_23-2149151162.jpg" },
  { id: 5, title: "UI/UX Design", instructor: "Amit Patel", rating: 4.5, students: "800", price: "Free", category: "IT & Software", image: "https://img.freepik.com/free-photo/ui-ux-design-concept_23-2149151163.jpg" },
  { id: 6, title: "Public Speaking", instructor: "Priya Sharma", rating: 4.8, students: "1.1k", price: "Free", category: "Communication", image: "https://img.freepik.com/free-photo/public-speaking-concept_23-2149151164.jpg" },
];

const ExploreCourses = () => {
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const categoryMatch = activeCat === "All" || c.category === activeCat;
      const searchMatch = !q || [c.title, c.instructor, c.category].some((v) => v.toLowerCase().includes(q));
      return categoryMatch && searchMatch;
    });
  }, [activeCat, query]);

  const clearFilters = () => { setQuery(""); setActiveCat("All"); };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between gap-3 mb-4 flex-wrap">
        <h4 className="fw-bold mb-0">Explore Courses</h4>
        {(query || activeCat !== "All") && <button type="button" className="btn btn-sm btn-outline-secondary" onClick={clearFilters}><FaTimes className="me-1" />Clear filters</button>}
      </div>

      <div className="card p-3 mb-4">
        <form onSubmit={(e) => e.preventDefault()} role="search">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-lg-8">
              <div className="input-group">
                <span className="input-group-text bg-body border-end-0"><FaSearch className="text-muted" /></span>
                <input type="search" className="form-control border-start-0" placeholder="Search courses, instructors, categories..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search courses" />
              </div>
            </div>
            <div className="col-12 col-lg-4 text-lg-end">
              <button type="button" className="btn btn-outline-secondary w-100" onClick={() => setShowFilters((v) => !v)} aria-expanded={showFilters}><FaFilter className="me-1" />Filters</button>
            </div>
          </div>
        </form>
        {showFilters && <div className="mt-3 pt-3 border-top"><div className="small text-muted mb-2">Filter by category</div><div className="d-flex gap-2 flex-wrap">{categories.map((cat) => <button key={cat} type="button" className={`btn btn-sm ${activeCat === cat ? "btn-primary" : "btn-outline-secondary"} rounded-pill`} onClick={() => setActiveCat(cat)}>{cat}</button>)}</div></div>}
      </div>

      <div className="d-flex gap-2 mb-4 flex-wrap">{categories.map((cat) => <button key={cat} type="button" className={`btn btn-sm ${activeCat === cat ? "btn-primary" : "btn-outline-secondary"} rounded-pill`} onClick={() => setActiveCat(cat)}>{cat}</button>)}</div>
      <div className="small text-muted mb-3">{filtered.length} {filtered.length === 1 ? "course" : "courses"} found</div>

      {filtered.length === 0 ? (
        <div className="card p-5 text-center"><FaSearch className="text-muted mb-3" size={28} /><h6 className="fw-bold">No courses found</h6><p className="text-muted small mb-3">Try another search term or category.</p><button type="button" className="btn btn-primary btn-sm" onClick={clearFilters}>Show all courses</button></div>
      ) : (
        <div className="row g-4">{filtered.map((c) => <div key={c.id} className="col-12 col-sm-6 col-lg-4 col-xl-3"><Link to={`/courses/${c.id}`} className="text-decoration-none text-body"><div className="card h-100 overflow-hidden"><img src={c.image} className="course-card-img" alt={c.title} loading="lazy" /><div className="card-body"><h6 className="fw-bold mb-1">{c.title}</h6><p className="small text-muted mb-2"><FaUser className="me-1" size={12} />{c.instructor}</p><div className="d-flex justify-content-between align-items-center gap-2"><span className="small"><FaStar className="text-warning" /> {c.rating} ({c.students})</span><span className="badge bg-success bg-opacity-10 text-success">{c.price}</span></div></div></div></Link></div>)}</div>
      )}
    </div>
  );
};

export default ExploreCourses;
