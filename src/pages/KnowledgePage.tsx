import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState, ErrorToast, SkeletonList } from '../components/AsyncStates';
import { mockData } from '../data/mockData';
import { useMockedData } from '../hooks/useMockedData';

const KnowledgePage = () => {
  const { data, loading, error, reload } = useMockedData(() => mockData.knowledgeArticles, { failFirst: true });
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => (data ?? []).filter((article) => article.title.toLowerCase().includes(query.toLowerCase())),
    [data, query]
  );

  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Knowledge Base</p>
            <h1 style={{ margin: 0 }}>Articles & Activity</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              className="input"
              placeholder="Search articles"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Link
              className="primary"
              to={`/knowledge/${mockData.knowledgeArticles[0].id}`}
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              Create Article
            </Link>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="ghost">Workspace</button>
          <button className="ghost">Global</button>
          <button className="ghost">Filters</button>
          <button className="ghost">Sort</button>
        </div>
      </section>

      <section className="card-grid">
        {loading && <SkeletonList count={4} />}
        {!loading &&
          filtered.map((article) => (
            <Link
              key={article.id}
              to={`/knowledge/${article.id}`}
              className="card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <p className="workspace" style={{ margin: 0 }}>{article.category}</p>
              <h3 style={{ margin: '0.5rem 0' }}>{article.title}</h3>
              <p>{article.excerpt}</p>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6b7280' }}
              >
                <span>By {article.author}</span>
                <span>{article.lastUpdated}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                {article.tags.map((tag) => (
                  <span key={tag} className="badge info">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        {!loading && filtered.length === 0 && (
          <EmptyState
            title="No knowledge found"
            message="No articles match your search."
            actionLabel="Back to knowledge hub"
            to="/knowledge"
          />
        )}
      </section>
      <ErrorToast message={error} onRetry={reload} />
    </div>
  );
};

export default KnowledgePage;
