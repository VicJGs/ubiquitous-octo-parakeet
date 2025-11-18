import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  knowledgeActivity,
  knowledgeArticles,
  knowledgeCategories,
  knowledgeStats,
  topContributors
} from '../data/mockData';

const KnowledgePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [category, setCategory] = useState('all');
  const [tag, setTag] = useState('all');
  const [author, setAuthor] = useState('all');
  const [type, setType] = useState('all');
  const [dateRange, setDateRange] = useState('any');
  const [sortBy, setSortBy] = useState<'recent' | 'views' | 'title'>('recent');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const handle = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(handle);
  }, [category, tag, author, type, dateRange, sortBy, query, viewMode]);

  const filteredArticles = useMemo(() => {
    const cutoff = new Date();
    if (dateRange === '7d') {
      cutoff.setDate(cutoff.getDate() - 7);
    } else if (dateRange === '30d') {
      cutoff.setDate(cutoff.getDate() - 30);
    }

    return knowledgeArticles
      .filter((article) => {
        const matchesQuery = article.title.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === 'all' || article.category === category;
        const matchesTag = tag === 'all' || article.tags.includes(tag);
        const matchesAuthor = author === 'all' || article.author === author;
        const matchesType = type === 'all' || article.type === type;
        const matchesDate =
          dateRange === 'any' || new Date(article.publishedOn).getTime() >= cutoff.getTime();

        return matchesQuery && matchesCategory && matchesTag && matchesAuthor && matchesType && matchesDate;
      })
      .sort((a, b) => {
        if (sortBy === 'views') return b.views - a.views;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime();
      });
  }, [author, category, dateRange, query, sortBy, tag, type]);

  const pinned = knowledgeArticles.filter((article) => article.pinned);
  const recent = [...knowledgeArticles].sort(
    (a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
  );

  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Knowledge Base</p>
            <h1 style={{ margin: 0 }}>Articles & Activity</h1>
          </div>
          <div className="horizontal-stack">
            <input
              className="input"
              placeholder="Search articles"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Link to="/knowledge/editor" className="primary" style={{ textDecoration: 'none' }}>
              Create Article
            </Link>
          </div>
        </div>
        <div className="stat-grid">
          {knowledgeStats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <p className="workspace" style={{ margin: 0 }}>
                {stat.label}
              </p>
              <p className="stat-value" style={{ margin: '0.35rem 0 0.2rem' }}>
                {stat.value}
              </p>
              <p className="stat-delta">{stat.delta}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid-two">
        <div className="card">
          <div className="section-header">
            <h2>Pinned for workspace</h2>
            <div className="pill-row">
              <button className={`ghost ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                Grid
              </button>
              <button className={`ghost ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}>
                Table
              </button>
            </div>
          </div>
          <div className="filters">
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">Category</option>
              {[...new Set(knowledgeArticles.map((a) => a.category))].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select className="input" value={tag} onChange={(e) => setTag(e.target.value)}>
              <option value="all">Tag</option>
              {[...new Set(knowledgeArticles.flatMap((a) => a.tags))].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select className="input" value={author} onChange={(e) => setAuthor(e.target.value)}>
              <option value="all">Author</option>
              {[...new Set(knowledgeArticles.map((a) => a.author))].map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="all">Type</option>
              {[...new Set(knowledgeArticles.map((a) => a.type))].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select className="input" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="any">Any date</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
            <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
              <option value="recent">Sort: Recent</option>
              <option value="views">Sort: Views</option>
              <option value="title">Sort: Title</option>
            </select>
          </div>

          <div className="pinned-row">
            {pinned.map((article) => (
              <Link
                key={article.id}
                to={`/knowledge/${article.id}`}
                className="badge info"
                style={{ textDecoration: 'none' }}
              >
                📌 {article.title}
              </Link>
            ))}
          </div>

          {loading && <p className="workspace">Loading results…</p>}
          {!loading && filteredArticles.length === 0 && (
            <div className="empty-state">
              <p className="workspace">No articles match your filters.</p>
              <p style={{ margin: 0 }}>Try clearing one of the filters to broaden results.</p>
            </div>
          )}

          {!loading && filteredArticles.length > 0 && viewMode === 'grid' && (
            <div className="card-grid">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/knowledge/${article.id}`}
                  className="card knowledge-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="pill-row">
                    <span className="badge info">{article.category}</span>
                    <span className="badge">{article.type}</span>
                  </div>
                  <h3 style={{ margin: '0.5rem 0' }}>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="meta-row">
                    <span>By {article.author}</span>
                    <span>{article.readingTime}</span>
                    <span>{article.lastUpdated}</span>
                  </div>
                  <div className="pill-row">
                    {article.tags.map((tagName) => (
                      <span key={tagName} className="badge info">
                        {tagName}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredArticles.length > 0 && viewMode === 'table' && (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Author</th>
                    <th>Tags</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article) => (
                    <tr key={article.id}>
                      <td>
                        <Link to={`/knowledge/${article.id}`} style={{ color: 'inherit' }}>
                          {article.title}
                        </Link>
                      </td>
                      <td>{article.category}</td>
                      <td>{article.type}</td>
                      <td>{article.author}</td>
                      <td>
                        <div className="pill-row">
                          {article.tags.map((tagName) => (
                            <span key={tagName} className="badge info">
                              {tagName}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>{article.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card stack">
          <div className="section-header">
            <h2>Categories</h2>
            <button className="ghost">Manage</button>
          </div>
          {knowledgeCategories.map((cat) => (
            <div key={cat.name} className="category-row">
              <span className="category-dot" style={{ background: cat.color }} aria-hidden />
              <div>
                <p className="category-name">{cat.name}</p>
                <p className="workspace" style={{ margin: 0 }}>
                  {cat.description}
                </p>
              </div>
            </div>
          ))}

          <div className="section-header" style={{ marginTop: '0.5rem' }}>
            <h2>Top contributors</h2>
            <button className="ghost">See all</button>
          </div>
          <div className="contributor-list">
            {topContributors.map((contributor) => (
              <div key={contributor.name} className="contributor-card">
                <img src={contributor.avatar} alt="" className="avatar" />
                <div>
                  <p className="category-name" style={{ marginBottom: '0.25rem' }}>
                    {contributor.name}
                  </p>
                  <p className="workspace" style={{ margin: 0 }}>
                    {contributor.specialty}
                  </p>
                </div>
                <span className="badge">{contributor.articles} articles</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-two">
        <div className="card">
          <div className="section-header">
            <h2>Recent articles</h2>
            <button className="ghost">Subscribe</button>
          </div>
          <div className="timeline">
            {recent.slice(0, 5).map((article) => (
              <div key={article.id} className="timeline-item">
                <div className="icon" aria-hidden>
                  📄
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>{article.title}</p>
                  <p className="workspace" style={{ margin: '0.15rem 0' }}>
                    {article.category} · {article.type} · {article.readingTime}
                  </p>
                  <p className="workspace" style={{ margin: 0 }}>
                    Updated {article.lastUpdated} · By {article.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <h2>Activity feed</h2>
            <button className="ghost">Export</button>
          </div>
          <div className="timeline">
            {knowledgeActivity.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="icon" aria-hidden>
                  🔔
                </div>
                <div>
                  <p style={{ margin: 0 }}>
                    <strong>{item.actor}</strong> {item.action} <strong>{item.target}</strong>
                  </p>
                  <p className="workspace" style={{ margin: '0.15rem 0' }}>
                    {item.category}
                  </p>
                  <p className="workspace" style={{ margin: 0 }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ErrorToast message={error} onRetry={reload} />
    </div>
  );
};

export default KnowledgePage;
