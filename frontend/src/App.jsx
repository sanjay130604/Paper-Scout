import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const PaperScout = () => {
  // Sample papers data
  const [papers, setPapers] = useState([
    {
      id: 1,
      title: "Deep Learning for NLP",
      summary: "An overview of deep learning techniques applied to natural language processing."
    },
    {
      id: 2,
      title: "Quantum Computing Advances",
      summary: "A review of recent breakthroughs in quantum computing research."
    },
    {
      id: 3,
      title: "AI in Healthcare",
      summary: "Exploring the impact of artificial intelligence on healthcare systems."
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Here you can implement actual search functionality
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <>
      {/* Search Section */}
      <section className="py-5 bg-light">
        <div className="container-fluid text-center">
          <h1 className="mb-4">Discover Research Papers</h1>
          <form className="d-flex justify-content-center" onSubmit={handleSearch}>
            <input
              className="form-control me-2 w-50"
              type="search"
              placeholder="Search papers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
      </section>

      {/* Papers Section */}
      <section className="py-5">
        <div className="container-fluid">
          <div className="row g-4 justify-content-center">
            {papers.map((paper) => (
              <div className="col-md-4" key={paper.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{paper.title}</h5>
                    <p className="card-text">{paper.summary}</p>
                    <a href="/" className="btn btn-primary">Read More</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3">
        <div className="container-fluid">&copy; 2025 PaperScout. All rights reserved.</div>
      </footer>
    </>
  );
};

export default PaperScout;
