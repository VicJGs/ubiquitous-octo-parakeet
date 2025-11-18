import { Link } from 'react-router-dom';
import { knowledgeArticles } from '../data/mockData';

const KnowledgePage = () => {
  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Knowledge Base</p>
            <h1 style={{ margin: 0 }}>Articles & Activity</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input className="input" placeholder="Search articles" />
            <button className="primary">Create Article</button>
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
        {knowledgeArticles.map((article) => (
          <Link key={article.id} to={`/knowledge/${article.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <p className="workspace" style={{ margin: 0 }}>{article.category}</p>
            <h3 style={{ margin: '0.5rem 0' }}>{article.title}</h3>
            <p>{article.excerpt}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6b7280' }}>
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
      </section>
    </div>
  );
};

export default KnowledgePage;
